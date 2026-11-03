"""Cut a home-practice session into one WAV per sentence.

Put the recording file(s) the family sent (and the CSV, if you have it) in one folder, then run
either of:

    python split_recording.py P07_2026-11-03_14h02_sentcomp-main.csv
    python split_recording.py P07_2026-11-03_14h02_sentcomp-main_rec1.m4a

The page also writes the trial log inside each recording, so the CSV is optional: given an
audio file, the script recovers the log from it and saves it as the CSV first.

Output, next to the CSV:
    <session>_trials/b01_t03_stim045.wav   one clip per sentence (16 kHz mono)
    <recording>.wav                        the full recording as WAV
    <recording>_labels.txt                 Audacity label track (File > Import > Labels)

Each clip runs from --pre seconds before the sentence appeared to --post seconds
after BİTTİ was tapped, so the end of a late answer is kept.
Needs ffmpeg on PATH (https://ffmpeg.org; on Windows: winget install ffmpeg).
"""
import argparse
import csv
import re
import shutil
import subprocess
import sys
from pathlib import Path


LOG_MARK = b'SENTCOMP-LOG v1\n'


def ffmpeg(*args):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *args], check=True)


def log_from_audio(audio):
    """Write the trial log embedded in a recording out as <session>.csv and return its path."""
    data = audio.read_bytes()
    i = data.rfind(LOG_MARK)
    if i < 0:
        sys.exit(f'No trial log inside {audio.name}. Use the CSV instead.')
    out = audio.with_name(re.sub(r'_rec\d+$', '', audio.stem) + '.csv')
    out.write_bytes(b'\xef\xbb\xbf' + data[i + len(LOG_MARK):])
    print(f'trial log recovered from {audio.name} -> {out.name}')
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('csv', type=Path, help='the session CSV, or one of its recordings')
    ap.add_argument('--pre', type=float, default=0.2, help='seconds kept before sentence onset (default 0.2)')
    ap.add_argument('--post', type=float, default=1.0, help='seconds kept after the tap (default 1.0)')
    args = ap.parse_args()

    if shutil.which('ffmpeg') is None:
        sys.exit('ffmpeg not found on PATH.')

    if args.csv.suffix.lower() != '.csv':
        args.csv = log_from_audio(args.csv)
    folder = args.csv.parent
    with open(args.csv, encoding='utf-8-sig', newline='') as f:
        rows = [r for r in csv.DictReader(f) if r.get('audio_file')]
    if not rows:
        sys.exit('No rows with audio in this CSV (session was run without the microphone).')

    out_dir = folder / (args.csv.stem + '_trials')
    out_dir.mkdir(exist_ok=True)

    labels = {}
    for r in rows:
        src = folder / r['audio_file']
        if not src.exists():
            print(f'missing recording: {src.name}  (skipping row)')
            continue
        on, off = float(r['audio_onset']), float(r['audio_offset'])
        start, end = max(0.0, on - args.pre), off + args.post
        stim = r['stim_no'] or 'ex'                       # 45, T3 (test mode) or ex (demo)
        stim = stim.zfill(3) if stim.isdigit() else stim
        tag = '_interrupted' if r.get('interrupted') == '1' else ''
        name = f"b{int(r['block_no']):02d}_t{int(r['trial_no']):02d}_stim{stim}{tag}.wav"
        # -ss after -i: accurate cut even though browser recordings have no seek index
        ffmpeg('-i', str(src), '-ss', f'{start:.3f}', '-to', f'{end:.3f}', '-ac', '1', '-ar', '16000', str(out_dir / name))
        labels.setdefault(src, []).append(f"{on:.3f}\t{off:.3f}\tb{r['block_no']} t{r['trial_no']}{tag}: {r['stimuli'].strip()}")
        print(name)

    for src, lines in labels.items():
        ffmpeg('-i', str(src), '-ac', '1', str(src.with_suffix('.wav')))
        src.with_name(src.stem + '_labels.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')

    print(f'\n{sum(len(v) for v in labels.values())} clips in {out_dir}')


if __name__ == '__main__':
    main()
