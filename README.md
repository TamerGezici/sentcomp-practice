# Home sentence-completion practice (pediatric)

A static web page you host on GitHub Pages. It follows the VIS sentence-completion task:

1. The block-start screen shows "1/4". The child taps to start.
2. A blank screen appears for 0.5 s.
3. Each sentence stays on screen until the child taps **BİTTİ**.
4. A fixation cross appears between sentences.
5. A rest screen appears between blocks.

The background is the same grey as the PsychoPy window. The child reads each sentence aloud and says the missing word. The phone's microphone records the whole session. The page runs entirely in the browser, with no server: the recording never leaves the family's phone until the parent sends it to you.

Works on: iPhone (Safari), Android (Chrome), tablets, and computers (Chrome, Edge, Firefox, Safari). Phones and tablets are the main target.

## Files

| File | What it is |
|---|---|
| `index.html` | The task. You shouldn't need to edit it. |
| `config.js` | Settings, all on-screen text (Turkish), and the sentence list. **Edit this file.** |
| `tools/split_recording.py` | Run on your own computer. Cuts the recording into one WAV per sentence. Not needed on the website. |

## Put it online (about 5 minutes)

1. Create a new **public** repository on GitHub, for example `sentcomp-practice`. Free GitHub Pages needs a public repository. Only the task and the sentences are in it, never any data.
2. Upload `index.html` and `config.js` to the root of the repository. You can drag them into "Add file → Upload files".
3. Go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, then `main` and `/ (root)`. Click Save.
4. After about a minute the site is live at `https://<your-username>.github.io/sentcomp-practice/`.

## Two modes

| Mode | What it shows | Use it to |
|---|---|---|
| `test` | the demo sentence, then the 5 `TEST_SENTENCES` (about 1 min) | check the mic, the sound quality and the file sending before the real run |
| `main` | the demo sentence, then all `SENTENCES` once in random order (101 sentences, about 16 min) | do the assessment |

The test sentences are separate from the main list, so the child doesn't see any sentence twice. Send each family two links with their code already filled in:

```
https://<your-username>.github.io/sentcomp-practice/?id=P07&mode=test
https://<your-username>.github.io/sentcomp-practice/?id=P07&mode=main
```

If the link has no `mode=`, the welcome screen shows both buttons.

Other link options:
- `&trials=5`: sentences per block. Leftover sentences go into the last block, so 101 becomes 19 blocks of 5 and one of 6.
- `&blocks=2`: stop after 2 blocks, for your own quick checks.
- `&example=0`: leave out the demo sentence.
- `&mic=0`: skip the microphone. The parent then records the sound on a second phone.

**Before sending it to a family, do one full test run on an iPhone and one on an Android phone.** That includes sending the files to yourself.

## What the family sends back

At the end the parent sees two buttons, **Ses kaydını gönder** and **Tabloyu gönder**. Each one opens the phone's share menu (WhatsApp, e-mail, Drive…) for one file. The files go one at a time because WhatsApp on Android rejects a mixed audio + CSV share with "empty message". Download links are also shown. If WhatsApp still fails, the parent can download the files and attach them in WhatsApp via 📎 → Belge (Document). The family sends you:

- `P07_2026-11-03_14h02_sentcomp-main.csv` (or `-test`): one row per sentence, with the same column names as the scanner output (`block_no`, `block_type`, `trial_no`, `stimuli`, `vis_sentence_started`, `vis_sentence_rt`, `vis_sentence_keys` …). It also has:
  - `mode`: `test` or `main`
  - `stim_no`: the sentence's row in the Excel file (`T1`–`T5` in test mode, empty for the demo sentence)
  - `audio_file`, `audio_onset`, `audio_offset`: where that sentence is in the recording, in seconds
  - `interrupted`: set to 1 if the child left the page in the middle of that sentence. The sentence is then shown again.
  - `mic`: `recorded`, `none`, or `lost`
- `P07_..._rec1.m4a`: the recording. It is AAC where the phone supports it (iPhone, most Android phones), otherwise `.webm` (Opus). **The trial log is also stored inside each recording**, so if only the audio arrives you still have everything. If the session was paused, for example by a phone call or by switching apps, recording starts again after the pause, so you get `rec2`, `rec3` and so on.

The session is also kept on the phone. If the page is closed before the files are sent, opening the same link again shows the saved session with the same send buttons.

To get one clip per sentence (ffmpeg must be installed):

```
python split_recording.py P07_2026-11-03_14h02_sentcomp-main.csv
# or, if you only received the audio:
python split_recording.py P07_2026-11-03_14h02_sentcomp-main_rec1.m4a
```

This also writes the full recording as a WAV and an Audacity label track. In Audacity, use File → Import → Labels, and every sentence will be marked on the timeline.

## Before using it with patients

- **Consent and ethics.** The pediatric consent form currently has no voice-recording sentence. Recording a child at home and receiving the file over WhatsApp or e-mail should be covered by the consent form and the application. KVKK treats a voice recording as personal data. Ask families to delete the files from their phone and chat once you've confirmed you received them.
- **Overlap with the scanner items.** Main mode shows all 101 sentences from `sent_comp_TR_PEDIATRIC_NEW.xlsx`, which is the same set the scanner draws from. The child will therefore have seen every scanner sentence before the scan.
- **The test sentences** in `config.js` were written for this page in the style of the pediatric set. Check them, or replace them with your own practice items.
- **Wording.** The instructions say "Cümleyi sesli oku ve boşluğa uyan kelimeyi söyle." Edit `instructions` in `config.js` if you want the child to say only the missing word.

## Possible upgrade: automatic upload

If you don't want families to send files by hand, the page can upload directly without a server of your own:

- [DataPipe](https://pipe.jspsych.org) can send the files to an OSF project.
- A Google Apps Script web app can save them to your Google Drive.

Either way, the data passes through a third party, so the ethics application would need to name that party.
