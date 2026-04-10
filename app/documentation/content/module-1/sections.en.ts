/**
 * Module 1 section content (English). Markdown strings keyed by section id.
 * Image slots use [IMAGE:slotId]; slot ids are defined in app/documentation/docImages.ts.
 */
export const sectionsEn: Record<string, string> = {
  "account-types": `On Meta Quest you can use different types of accounts depending on context: personal or institutional. Choosing the right one avoids management issues and aligns with your institution's policies.

**Summary**

- **Personal account:** one user per account; it can be used in class with a simple setup. It is also possible to share one account across multiple headsets, with limitations.
- **Institutional account (Work for Meta):** managed by the institution from [work.meta.com](https://work.meta.com/). Allows centralised management of devices, apps and users. This is the recommended option for headset fleets in educational settings.

[IMAGE:work-meta-dashboard]`,

  "personal-account": `A **personal** Meta account is an individual account tied to one user. It can be used in the classroom: setup is simpler and does not require enterprise services.

**Headset setup and account creation**

The process includes powering on the headset, choosing language, connecting to Wi‑Fi, and creating or signing in with a Meta account. You can follow official guides such as:

- [Meta Quest 3 setup (video)](https://www.youtube.com/watch?v=ZgxP9JrRdO8)
- [Create Meta Quest 3 account without Facebook](https://screenrant.com/meta-quest-3-account-without-facebook/)

**Sharing a personal account (pros and cons)**

If several people use the same personal account across different headsets:

- **Pros:** fewer accounts to manage, same content and apps across headsets.
- **Cons:** limits on account sharing, risk of mixing data and violating terms of use. Document good practices (who uses which headset, avoid changing passwords without notice) and be aware of Meta’s limits on shared use.

> **Note:** If you manage more than a few headsets, consider using an institutional account with Work for Meta to avoid these issues.`,

  "institutional-account": `**Institutional accounts** are managed with **Work for Meta** ([work.meta.com](https://work.meta.com/)) for education and work. They allow centralised management of devices, apps and users, removing the need to manage personal accounts and emails on each headset. Once the platform is configured, all the headaches with individual device setup are gone: adding new apps, removing apps, assigning app groups to specific institutions… everything becomes much simpler.

---

**Step 1 — Create a business or education account**

The first step is to create the account at [work.meta.com](https://work.meta.com/). It can be set up as a business or education account. Once created, you access the admin dashboard where everything is managed: devices, people, apps, templates and groups.

[IMAGE:work-meta-dashboard]

---

**Step 2 — Add people to the system**

Next, add people to the organisation. Work for Meta has a comprehensive role system: administrators, collaborators, etc. Each person can have different permissions depending on their function.

> **Recommendation:** If an external team will handle part of the configuration, the institution can simply create the account, invite the technical team as administrators by email, and assign them the necessary roles. Once everything is configured, the institution can independently manage simpler tasks like adding new devices or linking apps.

[IMAGE:work-meta-people]

---

**Step 3 — Add applications**

Before creating templates or groups, it is recommended to add the apps you will use. When adding apps to the platform, keep in mind:

- Apps must be **Private Apps** or published on Meta as **free and open**.
- **Paid apps cannot be added**, nor can apps in Alpha or Beta channels.
- The Work for Meta account **is not a developer account**. They are independent profiles.

**How does the app addition process work?**

1. The Work for Meta administrator provides the **organisation KEY** to the developer.
2. The developer sends an invitation from their development channel using that KEY.
3. The organisation accepts the invitation from the admin panel.
4. The app appears in the applications list, ready to be assigned to templates, groups or devices.

For third-party accounts, the process is the same: they send their organisation KEY so the developer can send them the invitation.

[IMAGE:work-meta-add-app]

Once added, apps are managed from the "Applications and content" panel:

[IMAGE:work-meta-apps]

---

**Step 4 — Create a device configuration template**

The template defines how devices are configured when activated. Here you set:

- Whether a **PIN** is required or not.
- Whether an **email** is required or not.
- Which **apps are installed by default** on devices using this template.

The template greatly simplifies the setup for the end user: with a good template, getting a Quest up and running is very straightforward, with no need for emails or PINs.

> **Tip:** If there is only one template, it is assigned by default to all devices when they are added, simplifying the process even further. Apps can be assigned directly from the template itself.

[IMAGE:work-meta-templates]

---

**Step 5 — Create device groups**

Groups allow you to organise devices logically, for example: "Headsets for School X", "Headsets for Training Centre Y", etc. Each group can have specific apps and templates assigned.

You can also:
- Unlink devices from a group.
- Move a device to a different group.
- Assign different apps to each group.

[IMAGE:work-meta-create-group]

---

**How to activate the headsets?**

There are two methods for activating devices. Both link the headset to the organisation and apply the configured template and apps.

---

***Method A — Via Wi-Fi (no cable)***

To configure headsets via Wi-Fi you need: an internet connection, the headset to activate, and a PC with the [work.meta.com](https://work.meta.com/) dashboard open in the browser.

1. Charge the headset and insert batteries into the controllers.
2. In the PC browser, go to the **"Activate Devices"** section.

[IMAGE:work-meta-activate-instructions]

3. On the headset: select the **language** and **Wi-Fi password**. The device update begins (installs the latest OS version, etc.).
4. In a later step, the button **"Have an organisation manage this device"** appears. The headset restarts.
5. The button **"Connect to your organisation"** appears and **6 digits** are displayed on screen (e.g. ABC-DEF).
6. In the PC browser, enter that 6-digit code.

[IMAGE:work-meta-activation-wifi]

7. Both sides connect. The headset indicates it is linking and the browser shows the same. After a few seconds, both confirm **"Linked to the organisation"**.
8. In the browser, the linked device now appears. It can be assigned to **groups**, **templates**, etc. from the admin panel.

[IMAGE:work-meta-device-linked]

9. On the headset, the assigned apps appear automatically: they update and install on their own.

[IMAGE:work-meta-headset-configured]

---

***Method B — Via USB cable (headset off)***

It is possible to configure the headset **without powering it on for the first time**. You need:

- A Windows or Mac PC.
- The USB cable to connect to the computer.
- The PC **must have Bluetooth**. Without it, pairing is not possible.

**Steps:**

1. Download the **Meta Horizon device configuration tool** for PC or Mac. The download links are inside the web platform's admin panel. On Windows, once installed a security alert may appear; simply accept the exception.

[IMAGE:work-meta-tool-download]

2. The headset must be **powered off**. Connect it to the PC via USB cable.

[IMAGE:work-meta-cable-connect]

3. Once connected, press **the power button and volume-down button simultaneously**. The "boot" menu appears on the headset.
4. At that point, the PC tool detects the headset. Click **"Link"** and fill in the requested details: Wi-Fi network name and password. Everything installs automatically.

[IMAGE:work-meta-activation-cable]

5. The update and configuration process starts on the headset. **There is absolutely nothing to do on the headset itself**; everything is done from the PC.
6. Once linked, a **template** is chosen for the device, just like with the Wi-Fi method. That template pushes the predefined configuration: whether a PIN is needed, whether an email is needed, and the app group selected on the platform.
7. As a result, when you power on the headset, **everything is already configured**: the assigned apps have been installed automatically.

[IMAGE:work-meta-headset-configured-cable]

---

**Things to keep in mind**

- **Resetting a device:** to unlink a headset and link it to another organisation or release it, simply use the **"Delete Device"** option in the admin panel. The headset performs a factory reset and starts from scratch.
- **Two parallel workflows:** app publishing through the developer channel (DEV) remains the same process. But Work for Meta is an independent profile for managing devices and apps at scale.

**Official resources**

- [Work for Meta — admin dashboard](https://work.meta.com/)
- [Work for Meta help](https://work.meta.com/help/1066783137225591?helpref=faq_content)`,

  "getting-started": `Before using the headset in class, it helps to master the basics: what’s in the box, how to wear it, IPD, and language.

**In the box and first steps**

- Follow the [Get started with Meta Quest 3](https://knowledge.vr-expert.com/kb/get-started-with-the-meta-quest-3/) guide.
- Correct headset placement, strap adjustment, and lens position.
- **Adjustable lenses:** Quest 3 allows you to vary the interpupillary distance by gently sliding the lenses. A numeric indicator between the lenses will show the selected position.
- **Straps and facial adjustment:** the top and side straps are adjustable. By combining the adjustment of these with the tilt of the headset on your face, you can find the optimal position for clear and comfortable vision.
- **IPD (interpupillary distance):** adjust the wheel between the lenses so the image is not blurry or double; improves comfort.
- **Language:** set it in Settings so students see the interface in the course language.

**Wearing with glasses**

Meta Quest 3 and 3S can be used with prescription glasses of reduced dimensions, according to manufacturer specifications, and include an accessory that increases the space between the VR headset and prescription glasses, avoiding pressure and increasing comfort. See [Wear Meta Quest 3S with glasses](https://knowledge.vr-expert.com/kb/how-to-wear-the-meta-quest-3s-with-glasses/) for recommended distance and accessories (facial spacers).

[IMAGE:quest-3-components]`,

  "classroom-setup": `To use Meta Quest 3(S) in the classroom in an orderly and safe way, set up the headsets and space before class.

**Headset setup**

- [Set up Meta Quest 3S](https://knowledge.vr-expert.com/kb/how-to-set-up-the-meta-quest-3s/)
- [Getting started with Meta Quest 3S in the classroom](https://knowledge.vr-expert.com/kb/getting-started-with-meta-quest-3s-in-the-classroom/)

This includes powering on, account (personal or institutional), Wi‑Fi, Guardian/play boundary, and if applicable, pairing with the mobile app for management and casting.`,

  "settings": `System settings let you adapt the headset to the space and user. Review these before each session.

**Key topics**

- **Headset lights:** indicate status (on, charging, updating). See [What the lights on Meta Quest 3(S) mean](https://knowledge.vr-expert.com/kb/what-do-the-different-lights-on-the-meta-quest-3-mean/).
- **Passthrough:** see the real environment through the cameras. [Activate passthrough on Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-activate-passthrough-on-the-meta-quest-3/).
- **Guardian / play boundary:** defines the safe zone. [Set up a play boundary](https://knowledge.vr-expert.com/kb/how-to-set-up-a-play-boundary-on-the-meta-quest-3/). During setup:
  - Select the interaction type: stationary or room-scale. For most applications, choose "Room-scale".
  - If automatic floor detection is not accurate, manually indicate the floor location.
  - Define the safe zone by drawing on the floor with the controller trigger, marking the available movement area.
- **Hand tracking:** use hands without controllers. [Turn on hand tracking](https://knowledge.vr-expert.com/kb/how-to-turn-on-hand-tracking-on-the-meta-quest-3/).
- **Controllers:** [Pair controllers with Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-pair-the-controllers-with-the-meta-quest-3/). Many applications only use the right controller. Make sure it has battery (AA or rechargeable). When you move it or press any button, it should be automatically detected by the system.
- **IPD:** [Change IPD on Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-change-the-ipd-on-the-meta-quest-3/).
- **Language:** [Supported languages](https://knowledge.vr-expert.com/kb/which-languages-does-the-meta-quest-3-support/) and [how to change language](https://knowledge.vr-expert.com/kb/how-to-change-the-language-on-the-meta-quest-3/).
- **Screen recording:** [Screen record with Meta Quest 3](https://knowledge.vr-expert.com/kb/how-to-screen-record-with-the-meta-quest-3/).
- **Developer mode:** only if you need to install apps from external sources. [Activate developer mode](https://knowledge.vr-expert.com/kb/how-to-activate-developer-mode-on-the-meta-quest-3/).
- **Updates:** [Update the operating system of Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-update-the-operating-system-of-the-meta-quest-3/). Updates are not downloaded automatically; to get them, you need to access the "Update" section within the app if new versions are available.

You can complement with a [complete Quest 3S beginner’s guide](https://knowledge.vr-expert.com/kb/how-to-use-the-meta-quest-3s-buttons/) (buttons and general use).

[IMAGE:quest-3-ipd]`,

  "mobile-connection": `Connecting the headset to the **Meta Quest (Horizon)** app on your phone makes daily management and casting easier.

**Benefits**

- Download and install apps on the headset from the phone.
- See battery status and headset settings.
- Start casting to a screen or projector with fewer steps.
- Manage multiple devices if you use several Quests.

**How to do it**

1. Install the **Meta Quest** app from [App Store](https://apps.apple.com/app/meta-quest/id1365028940) or [Google Play](https://play.google.com/store/apps/details?id=com.oculus.vrshell).
2. Power on the headset and open the app on your phone.
3. Follow the pairing flow (Bluetooth and Wi‑Fi); the headset will show a code or confirmation.
4. Once linked, you’ll see the device in the app and can use the features above.`,

  "organization-storage": `Keeping headsets, controllers, and accessories organised reduces loss and extends the life of the equipment.

**Good practices**

- **Labelling:** mark each headset and its matching controller (number, colour, or code) so they are not mixed up.
- **Usage log:** note which headset each group or student used if needed for maintenance or incidents.
- **Storage:** store headsets in a fixed place, protected from impact and direct sunlight (sunlight can damage the lenses).
- **Transport:** use cases or carts designed for Quest when moving between rooms.
- **Charging:** use power strips or charging carts to charge multiple headsets at once; check that the LED indicates full charge.

**References**

- [Charge Meta Quest 3](https://knowledge.vr-expert.com/kb/how-to-charge-the-meta-quest-3/)
- [Change Meta Quest 3 controller batteries](https://knowledge.vr-expert.com/kb/how-to-change-batteries-on-the-meta-quest-3-controllers/)
- [Delete applications on Meta Quest 3](https://knowledge.vr-expert.com/kb/how-to-delete-applications-on-the-meta-quest-3/)
- [Check storage space on Meta Quest 3](https://knowledge.vr-expert.com/kb/how-to-check-how-much-storage-space-is-available-on-the-meta-quest-3/)`,

  "specifications": `Knowing the headset specifications helps plan classroom use (space, battery life, compatibility).

**Useful points**

- **Serial number:** for warranty and inventory. Where to find it: see the model guide in the [KB](https://knowledge.vr-expert.com/kb/how-to-use-the-meta-quest-3s-buttons/).
- **Use with glasses:** [Wear Meta Quest 3(S) with glasses](https://knowledge.vr-expert.com/kb/how-to-wear-the-meta-quest-3s-with-glasses/).
- **Speakers and microphone:** Quest 3(S) has both built in.
- **Chipset, RAM, display, FOV, tracking, weight:** [Meta Quest 3(S) headset specifications](https://knowledge.vr-expert.com/kb/what-are-the-headset-specifications-of-the-meta-quest-3/), [display specifications](https://knowledge.vr-expert.com/kb/what-are-the-display-specifications-of-the-meta-quest-3/), [tracking type](https://knowledge.vr-expert.com/kb/what-kind-of-tracking-does-meta-quest-3s-use/), [field of view](https://knowledge.vr-expert.com/kb/what-is-the-field-of-view-of-the-quest-3s/), [weight](https://knowledge.vr-expert.com/kb/what-is-the-weight-of-the-meta-quest-3/).
- **Buttons and basic use:** [Use Meta Quest 3S buttons](https://knowledge.vr-expert.com/kb/how-to-use-the-meta-quest-3s-buttons/).
- **Initial setup:** [How to set up Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-set-up-the-meta-quest-3/).`,

  "app-lab": `**App Lab** is Meta’s channel for distributing apps in beta or not yet on the main store. In education it is used to access specific apps via link or invitation.

**Typical flow**

1. **Receive link or invitation:** the instructor or developer gets an App Lab link by email or web.
2. **Accept:** when you open the link and accept, the app is tied to the Meta account you’re signed in with at that time.
3. **Install on one headset:** with the headset on and the same account, the app appears in the library or can be installed from the link.
4. **Replicate on multiple headsets:** if all headsets use the same account (shared personal or institutional), the app installed on one can be installed on the others from the mobile app or from the headset.

**Why it’s used in education**

It allows using educational or experimental apps that are not yet on the official Store, with a link-controlled process.

**Common issues**

- **App doesn’t appear:** ensure the headset is signed in with the account you used to accept the invitation; if you accepted before setting up the headset, open the link again with the headset already set up.
- **App doesn’t download:** check Wi‑Fi and that there aren’t too many downloads queued; free space if needed.`,

  "store-install": `The **Meta Quest Store** (inside the headset or from the mobile app) is the main source of official applications.

**Step-by-step installation**

1. Open the **Store** from the headset menu or from the Meta Quest app on your phone.
2. Search for the app by name or browse categories.
3. Tap **Get** or **Buy** (depending on free or paid).
4. Wait for download and installation to finish; the app will appear in the library.

**Recommended apps for education**

There are free and paid apps aimed at education: simulations, virtual visits, procedural training, etc. Check updated lists in the Store (Education category or similar) or in your institution’s resources.`,

  "apps-in-headset": `Once installed, applications are managed from the headset (and from the mobile app if linked).

**Check app version**

In the headset library, select the app (usually via the three dots or “Info”) to see details; the installed version is usually shown there. Useful to ensure all headsets have the same version before class.

**Uninstall an app**

From the library, long-press the app icon and choose **Uninstall** (or **Remove**). You can also use the guide [Delete applications on Meta Quest 3](https://knowledge.vr-expert.com/kb/how-to-delete-applications-on-the-meta-quest-3/).

**Accessing apps from the menu**

From the Meta Quest 3 main menu, access the app bar. Using the controller trigger, open the installed applications window. In the top right corner, expand the categories menu and scroll down to **"Unknown Sources"** if your application does not appear in the main list. There you will find the app you want to use; select its icon or name to launch it.

**App credentials vs headset account**

App credentials (e.g. login inside the app) do not have to match the headset’s Meta account. Headsets can be on an institutional account while the app asks for a different educational login; manage those credentials according to your institution’s policy.

**Note on app updates**

The first time you open an application, it will launch directly. Updates are not downloaded automatically; to get them, access the “Update” section within the app if new versions are available.`,

  "casting": `**Casting** lets you show on a screen or projector what the user sees inside the headset. It’s very useful for the rest of the class to follow the experience and for the instructor to supervise and guide.

**What it’s for**

- Guided observation: the group sees the same view as the person wearing the headset.
- Real-time feedback: the instructor can comment on what they see.
- Group control: keep attention and order during the VR activity.

**How to turn it on**

- **From the headset:** in the quick menu (Meta button), find **Casting** or **Cast** and choose the target device (Chromecast, Meta Quest app on phone/PC, etc.).
- **From the mobile app:** if the headset is linked, the app usually has a button to start casting to a TV or projector (e.g. via Chromecast).

**Resources**

- [Casting with Meta Quest (devices and methods)](https://www.meta.com/en-gb/help/quest/192719842695017/)
- [Casting with Chromecast (video)](https://www.youtube.com/watch?v=_BgUP5T8_3M)
- [Troubleshoot casting to a screen with Meta Quest](https://www.meta.com/en-gb/help/quest/214966974548157/)`,

  "connectivity-data": `Headsets need connectivity to install apps, update the system, and use cloud services; you can also connect them to a PC or Bluetooth devices.

**Wi‑Fi**

- [Connect Meta Quest 3(S) to Wi‑Fi](https://knowledge.vr-expert.com/kb/how-to-connect-the-meta-quest-3-to-wi-fi/)
- In the classroom, use a stable network; if the institution’s network has strict restrictions or firewalls, consider a dedicated router for the headsets.

**Bluetooth**

- [Connect a Bluetooth device to Meta Quest 3(S)](https://www.meta.com/help/quest/) (search for “Bluetooth” in official help).

**PC connection (Windows)**

- [Connect Meta Quest 3(S) to a Windows computer](https://www.meta.com/help/quest/) (useful for file transfer or Link/Air Link if needed).

**File transfer**

- [Transfer files from a Windows PC to Meta Quest 3(S)](https://www.meta.com/help/quest/) (via USB cable or official tools).`,

  "cleaning": `Clean headsets and controllers after every use with a non-abrasive, non-alcoholic wipe. Clean lenses only with a dry microfiber cloth — never spray liquid directly on lenses. Allow surfaces to air-dry before the next user.

> For complete cleaning workflows and hygiene protocols for shared classroom use, see **Module 4: Safety, Wellbeing, and Accessibility**.`,

  "accessories": `Optional accessories can improve comfort and durability in educational settings.

**Where to find out more**

- [What accessories are available for Meta Quest 3](https://knowledge.vr-expert.com/kb/what-accessories-are-available-for-the-meta-quest-3/)

Typical examples: alternative head straps, carry cases, facial spacers for glasses wearers, lens protectors. Choose according to use (classroom, transport, different users).`,

  "pre-class-checklist": `Going through this checklist before each session reduces technical failures and keeps the focus on the learning activity.

- **Headsets charged:** check that the LED indicates full charge (e.g. green at 100%).
- **Apps opened and tested:** have opened at least once the app you will use and confirmed it launches correctly.
- **Boundary set:** Guardian/play area drawn and tested in the actual classroom space.
- **Casting tested:** if you will project, verify that the casting device (Chromecast, app, etc.) works with the headset.
- **Plan B ready:** have an alternative activity if VR fails (Wi‑Fi, app, or device).`,
};
