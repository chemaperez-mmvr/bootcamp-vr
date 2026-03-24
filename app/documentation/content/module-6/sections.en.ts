/**
 * Module 6 section content (English). Solving Common VR Problems in the Classroom.
 */
export const sectionsEn: Record<string, string> = {
  "wifi-connection": `Wi-Fi issues are the most common technical problem in VR classrooms. Here's how to diagnose and fix them quickly.

**Symptoms**

- Headset shows "No internet connection"
- Apps fail to load or stream content
- Casting stops working or becomes laggy

**Step-by-step solution**

1. **Reset Wi-Fi on your mobile phone:** In your phone's settings, turn off Wi-Fi, then turn it back on. This can help if you're using the Meta Horizon app for setup.
2. **Reboot your headset:** Hold the power button until the shutdown screen appears, then select Restart. If that doesn't work, perform a hard reboot by holding the power button for 30 seconds.
3. **Try a different network:** If you're still having problems, try connecting to a different network. This could be a personal hotspot — just make sure the phone you're using for pairing and the headset are on the same Wi-Fi network.
4. **Forget and re-add the network:** Go to Settings → Wi-Fi → select the network → Forget → reconnect with the password.
5. **Check for network restrictions:** Some school or corporate networks block VR traffic. Ask your IT team if ports required by Meta Quest are open. Mesh networks, certificate-based networks, and hotel/airport Wi-Fi often block casting and streaming.
6. **Post-setup Wi-Fi issues:** If your headset was already set up and Wi-Fi stops working, try toggling Wi-Fi off and on in quick settings, or visit Settings → Wi-Fi to reconnect.

**Prevention**

- Test Wi-Fi on all headsets before class.
- Have the Wi-Fi password written down and accessible.
- Consider using a dedicated router for VR headsets if your school network is unreliable or heavily restricted.
- Ensure the phone used for pairing and the headset are always on the same Wi-Fi network.

📎 **Official reference:** [Troubleshoot the Wi-Fi connection of your Meta Quest](https://www.meta.com/en-gb/help/quest/324548839092626/) | [Post-setup Wi-Fi troubleshooting](https://www.meta.com/help/quest/517103729284781/)`,

  "pins-access-codes": `PIN and access code issues can prevent students from using headsets. Understanding the different types of codes helps resolve them faster.

**Types of PINs and codes on Meta Quest**

- **Device pairing code:** A 5-digit code displayed in the headset during first setup to connect with the Meta Horizon mobile app. This code stays the same even after a factory reset.
- **Login code:** An 8-character alphanumeric code shown in the headset when logging in. You enter it at [www.meta.com/device](https://www.meta.com/device/).
- **Passcode:** A 4–16 digit security code that protects your Meta Horizon profile on the headset. It prevents others from accessing your profile, saved passwords, and locked apps. This is optional and is erased by a factory reset.
- **Meta Quest PIN (purchases):** A 4-digit PIN created during account setup, used to verify identity and simplify purchases in the Meta Horizon Store. All devices on the same account share the same PIN.
- **One-time email codes:** Codes sent to your email for security verification. Never share these codes and ignore any you didn't request.

**Step-by-step solution**

1. **Identify which code is being requested:** Is it a pairing code, login code, passcode, or purchase PIN? Each has a different resolution path.
2. **For pairing codes:** The 5-digit code is shown in the headset. Make sure the Meta Horizon mobile app is installed and up to date.
3. **For login codes:** Visit [www.meta.com/device](https://www.meta.com/device/) on a computer or phone and enter the 8-character code shown in the headset.
4. **For forgotten passcodes:** Use the Meta Horizon mobile app to manage or reset the passcode. If that doesn't work, a factory reset will erase the passcode (but also all data).
5. **For purchase PIN issues:** Manage your Meta Quest PIN at [meta.com account settings](https://www.meta.com/help/quest/119389083518185/).
6. **For institutional accounts:** Contact your Meta Horizon Managed Services administrator.

**Prevention**

- Document all PINs and access codes in a shared instructor reference sheet (store securely).
- Use simple, standardized passcodes for shared classroom headsets.
- Test PIN/passcode access before every class session.
- Keep the Meta Horizon mobile app updated on your phone.

📎 **Official reference:** [Learn about PINs and codes for Meta Horizon and Meta Quest](https://www.meta.com/en-gb/help/quest/1396767491334420/) | [Manage your passcode](https://www.meta.com/help/quest/1198803198189099/)`,

  "boundary-guardian-problems": `Boundary (Guardian) issues can prevent VR experiences from starting or cause safety warnings during use.

**Why the headset forgets your boundary**

According to Meta's official documentation, your headset may forget a previous boundary if:

- **The physical space has changed significantly** — moved furniture, changed wall decorations, or many people moving around in the play area.
- **The lighting has changed significantly** — prominent windows with different daytime vs. nighttime lighting, or the direction of indoor lighting has changed (e.g., the light source moved to a different side of the room).

**Step-by-step solution**

1. **Re-draw the boundary:** Stand as close as possible to the centre of the intended playing area when drawing your boundary.
2. **Look around the room while drawing:** Only looking in one direction while drawing the boundary reduces the likelihood of the headset remembering it in the future.
3. **Ensure appropriate lighting:** Avoid direct sunlight in the play area. A good rule: if you can read a book in the room, the lighting is sufficient.
4. **Clear the area:** Make sure the area within the boundary is free of hazards, obstacles, reflective surfaces, mirrors, and glass.
5. **Enable stationary boundary:** If space is very limited, use the stationary boundary option instead of room-scale. This creates a small circular boundary around the user.
6. **Restart the headset** if the boundary system is unresponsive.

**Prevention**

- Set up boundaries before students arrive and keep the room layout consistent.
- Use consistent lighting in the VR area — avoid changing light sources between sessions.
- Mark physical boundaries on the floor with tape so you can quickly re-draw them if needed.
- Always ensure the area within the boundary is clear of obstacles.

📎 **Official reference:** [Troubleshoot Meta Quest headsets: Boundary](https://www.meta.com/en-gb/help/quest/637588533755549/) | [Set up your boundary](https://www.meta.com/help/quest/463504908043519/)`,

  "headset-not-turning-on": `A headset that won't turn on is alarming but usually has a simple fix.

**Step-by-step solution**

1. **Check the battery:** Press the power button briefly. If the LED flashes orange or red, the battery is depleted. Plug in the charger and wait at least 10 minutes before trying again.
2. **Try a hard reboot:** Hold the power button for 30 seconds. Release it, wait 10 seconds, then press it again.
3. **Check the charger and cable:** Try a different USB-C cable and charging adapter. The original cable might be damaged.
4. **Look for LED indicators:** A solid green LED means fully charged; solid orange means charging; no light may indicate a deeper issue.
5. **Let it charge for 30 minutes:** Sometimes headsets need extended charging before they can turn on if the battery was fully depleted.
6. **Use the software update tool:** Before doing a factory reset, try Meta's [software update tool](https://www.meta.com/help/quest/software_update/) which can update your device even when it's unresponsive.
7. **Contact support** if none of the above works — the headset may have a hardware issue.

**Prevention**

- Charge all headsets fully the night before class.
- Establish a regular charging routine (same time, same place, same person responsible).
- Check battery levels on all headsets as part of your pre-class checklist.

📎 **Official reference:** [How to restart your Meta Quest headset](https://www.meta.com/help/quest/963075691100632/)

🎬 **Video tutorial:** [Meta Quest not turning on — Troubleshooting guide](https://www.youtube.com/watch?v=3C54xV-t73Y)`,

  "login-problems": `Login and authentication issues can block access to apps and content. Here's how to troubleshoot them based on Meta's official guidance.

**Common problems**

- "Login failed" or "Authentication error" messages
- Account not recognized after being logged out
- Two-factor authentication issues
- App-specific login problems (different from headset login)

**Step-by-step solution**

1. **Make sure the headset is connected to Wi-Fi:** Your headset needs a Wi-Fi connection to log you back in. If you don't have Wi-Fi, the headset will prompt you to connect.
2. **Check the Meta Horizon mobile app:** If you're logged in to the app on your phone with the same account, the app should log you back in to the headset automatically. Make sure:
   - You have the latest version of the Meta Horizon app installed.
   - Bluetooth is turned on and the app has Bluetooth permissions.
   - The app shows the headset is connected via Bluetooth.
3. **Resolve account issues:** Visit [https://auth.meta.com/settings/my/devices/](https://auth.meta.com/settings/my/devices/) — if you see your headset listed, you should be able to log back in. If you get redirected or can't load the page, follow the instructions to resolve your account issues.
4. **Confirm the right account:** Make sure you're logging in with the same account used to add your profile to the headset. Check at [auth.meta.com/settings/my/devices](https://auth.meta.com/settings/my/devices/).
5. **Update headset software:** You may need to update your headset before logging in. Use the [software update tool](https://www.meta.com/help/quest/software_update/).
6. **Perform a hard reboot:** Hold the power button for 30 seconds until the device turns back on.
7. **For app-specific logins:** Remember that some VR apps have their own accounts separate from the Meta account.

**Prevention**

- Keep a reference document with all account credentials (store securely).
- Test logins on all headsets before class.
- Ensure two-factor authentication recovery methods are accessible.
- Keep the Meta Horizon mobile app updated and connected via Bluetooth.

📎 **Official reference:** [Troubleshoot issues logging back in to your Meta Quest headset](https://www.meta.com/en-gb/help/quest/580216334910126/) | [Recover your Meta account](https://www.meta.com/help/quest/3319763318177048/)`,

  "cloud-streaming-lag": `Cloud-streamed VR content may experience lag or poor performance. This is closely related to Wi-Fi quality, as streaming depends on a stable, fast network connection.

**Symptoms**

- Visible lag or delay in hand/controller tracking
- Blurry or pixelated visuals
- Audio out of sync with visuals
- App freezing or stuttering

**Step-by-step solution**

1. **Check internet speed:** Cloud streaming requires a stable connection with at least 20–50 Mbps. Run a speed test on the same network.
2. **Reduce network load:** Disconnect unnecessary devices from the Wi-Fi network. Multiple headsets streaming simultaneously can overwhelm the network.
3. **Move closer to the router:** Physical distance and walls reduce Wi-Fi signal quality.
4. **Use 5 GHz or 6 GHz Wi-Fi:** If available, connect to the 5 GHz or 6 GHz band instead of 2.4 GHz for better bandwidth and lower latency. This is also recommended by Meta for casting.
5. **Reboot the headset:** Hold the power button until the shutdown screen appears, then select Restart. If needed, perform a hard reboot by holding the power button for 30 seconds.
6. **Close background apps:** Other apps running on the headset consume resources. Close everything not needed.
7. **Try a different network:** Some networks (mesh networks, corporate networks) may throttle or block streaming traffic.

**Prevention**

- Test streaming performance before class with the actual number of headsets you'll use.
- Use a dedicated router with a 5 GHz network for VR headsets.
- Have a backup plan: download key content locally when possible to avoid streaming dependency.
- Avoid using school guest networks — these often have bandwidth limits.

📎 **Official reference:** [Troubleshoot Wi-Fi connection on Meta Quest](https://www.meta.com/en-gb/help/quest/288249631018028/) | [Connect your headset to Wi-Fi](https://www.meta.com/help/quest/1816744325172615/)`,

  "software-update-issues": `Software updates can cause delays and unexpected changes. Manage them proactively using Meta's official procedures.

**Common problems**

- Update starts automatically during class
- Update fails or gets stuck
- Apps behave differently after an update
- Not enough storage space for the update

**How to check for and manage updates**

1. Press the Meta button (or Oculus button) on your right controller to open the universal menu.
2. Select the clock on the left-hand side to open Quick Settings.
3. Select Settings in the top right.
4. Select General, then select Software Update.
5. From here, you can check your current software version and download any available updates.

**Automatic update settings**

Your headset will update automatically when connected to Wi-Fi and turned on. With "Automatically power headset to update" enabled, the headset will briefly power on to apply updates and power off when done. Cameras and microphones cannot collect or record data during this process.

To toggle automatic updates: Settings → General → Software Update → toggle "Automatically power headset to update."

**Note:** You can't use automatic power-on updates if you have a lock PIN set.

**Step-by-step solution for problems**

1. **Update the night before class**, never right before.
2. **If an update is stuck:** Restart the headset and try again. Ensure stable Wi-Fi and sufficient battery (above 50%).
3. **Use the software update tool:** Visit Meta's [software update tool](https://www.meta.com/help/quest/software_update/) to update even an unresponsive headset.
4. **Check available storage:** Go to Settings → Storage. Clear unnecessary files or apps if space is low.
5. **After an update:** Test all apps you plan to use to ensure they still work correctly.

**Prevention**

- Schedule a regular update day (e.g., every Friday after class).
- Update all headsets at the same time to keep them in sync.
- Always test apps after any update before using them in class.
- Keep headsets charged, connected to Wi-Fi, and on a flat surface to allow automatic updates overnight.

📎 **Official reference:** [Update the software for your Meta Quest](https://www.meta.com/en-gb/help/quest/540602136930952/) | [Meta Quest release notes](https://www.meta.com/help/quest/172903867975450/)`,

  "casting-issues": `Casting allows you to share the VR experience on a screen. When it fails, troubleshooting depends on the target device.

**Casting to a mobile phone or tablet**

1. Log in to the same Meta account on both the headset and the [Meta Horizon mobile app](https://www.meta.com/help/quest/1178714089211378/).
2. Confirm that the headset and the device are on the same Wi-Fi network.
3. If it still doesn't work, restart the headset, phone, and casting device.
4. Check for software updates on all devices.
5. If it still fails, restart your Wi-Fi router.

**Casting to a web browser**

1. Make sure you're logged in with the same account on your browser.
2. Go to [oculus.com/casting](https://oculus.com/casting) and log in.
3. Start casting from the headset.

**Casting to a Chromecast-enabled device**

1. Make sure your TV supports Chromecast and that it's enabled in TV settings.
2. If your network has two bands, confirm that all devices are on the same Wi-Fi band. Use 5 GHz or 6 GHz instead of 2.4 GHz for better performance.
3. Make sure the date and time on the Chromecast device is accurate.
4. For additional help, visit the [Chromecast Help Centre](https://support.google.com/chromecast/chromecast/).

**Known issues (from Meta)**

- Mesh networks, corporate networks, and certificate-based networks may block casting for security purposes. This is common on home guest networks, corporate/commercial networks (hotels, airports), and some mobile tethering systems.
- TVs with built-in Chromecast may be supported, but compatibility isn't guaranteed with all models.
- Casting and recording simultaneously may cause issues.
- Casting may increase battery usage or degrade in-app performance.

**Prevention**

- Test casting setup before students arrive, using the same network configuration.
- Have a secondary casting method ready (phone app, browser at oculus.com/casting).
- Use a wired connection (Ethernet) for the casting target device when possible.
- If your network blocks casting, try a different network or a personal hotspot.

📎 **Official reference:** [Troubleshoot casting to a screen with Meta Quest](https://www.meta.com/en-gb/help/quest/214966974548157/) | [Cast to a screen with Meta Quest](https://www.meta.com/help/quest/192719842695017/)`,

  "factory-reset": `A factory reset should only be used as a last resort. It erases all data, apps, and settings from the headset.

**Before you factory reset — try these first**

Meta recommends trying these steps before resorting to a factory reset:

1. **Update your device** using the [software update tool](https://www.meta.com/help/quest/software_update/). This can update your headset's software even when the device is unresponsive.
2. **Hard reboot:** Hold the power button for 30 seconds until you hear the device turn back on.

**Things to know before you begin**

- Performing a factory reset is **irreversible** and will remove all account information, downloaded games, and content from the headset.
- Content you've **purchased** from your account is not lost — you can re-download it after setup.
- [Turn on cloud backup](https://www.meta.com/help/quest/399621398228171/) before resetting to save your app data and settings.
- Ensure the headset has **at least 50% battery** before performing a factory reset.

**Method 1 — From the headset**

1. Turn off the headset.
2. Hold the **power button and volume down (-) button** simultaneously until the boot screen loads.
3. Use the volume buttons to highlight **Factory Reset** and press the power button to select.
4. Use the volume buttons to highlight **Yes** and press the power button to confirm.

**Method 2 — From the Meta Horizon mobile app**

1. Open the Meta Horizon app on your phone.
2. Navigate to Devices → select your headset.
3. Find the Factory Reset option and confirm.

**Method 3 — Remote factory reset**

If you've lost access to a headset, you can perform a remote factory reset from your Meta account to protect your data and personal information.

**After a factory reset**

- Full initial setup is required again.
- All apps must be reinstalled (purchased apps can be re-downloaded).
- All settings and passcodes must be reconfigured.
- Boundary/Guardian must be set up again.

📎 **Official reference:** [How to factory reset your Meta Quest](https://www.meta.com/en-gb/help/quest/149134797159340/) | [Cloud backup for Meta Quest](https://www.meta.com/help/quest/399621398228171/)

🎬 **Video tutorial:** [How to factory reset your Meta Quest headset](https://www.youtube.com/watch?v=dQ9IeyFChCI)`,

  "pairing-controllers": `Controller pairing issues can prevent students from interacting with VR content. Controllers must be paired using the Meta Horizon mobile app.

**Important:** It is not possible to pair controllers without using the Meta Horizon mobile app.

**How to pair controllers (official procedure)**

1. Make sure the headset is turned on, then open the Meta Horizon app on your phone.
2. Tap **Menu** at the top of your Horizon Feed.
3. Tap **Devices**.
4. Select the headset you want to pair controllers to.
5. Tap **Headset settings**, then tap **Controllers**.
6. Tap **Pair new controller**.
7. Choose which controller you'd like to pair (left or right).
8. Press and hold:
   - **Right controller:** Meta/Oculus button + B button
   - **Left controller:** Menu button + Y button
   
   Hold until the controller LED blinks and then lights up to finalize pairing.

**How to unpair controllers**

1. Open the Meta Horizon app → Menu → Devices.
2. Select the headset → Headset settings → Controllers.
3. Tap the controller to unpair → Unpair controller.

**Troubleshooting tips (from Meta)**

- Make sure the battery tabs have been removed from both controller housings.
- Change or reseat the battery and check the controller is receiving power.
- Check that the Meta Horizon app is up to date.
- Make sure Bluetooth is enabled on your phone, and your phone and headset are on the same Wi-Fi network.
- Your device must be on and unlocked to pair a controller.
- If you have a passcode but can't use a controller, use the white dot in the centre of the headset's view and volume buttons to enter your passcode.
- If using third-party accessories (sleeves, covers, stickers), remove them as they may interfere with pairing or tracking.

**Warranty replacement headsets:** When setting up a replacement headset, existing controllers won't automatically pair. Use gaze functionality (head movement) to complete setup.

**Prevention**

- Label controllers and headsets so pairs stay together.
- Check controller battery levels in the pre-class checklist.
- Keep spare batteries available.
- Keep the Meta Horizon mobile app installed and updated on your phone.

📎 **Official reference:** [Pair and unpair Meta Quest Touch controllers](https://www.meta.com/en-gb/help/quest/967070027432609/) | [Troubleshoot controller drift](https://www.meta.com/help/quest/5545675425557880/)`,

  "visual-issues": `Blurry, distorted, or uncomfortable visuals reduce the VR experience. Most visual issues have simple physical fixes.

**Common problems**

- Blurry image
- Distorted or stretched visuals
- "Sweet spot" is hard to find
- Fogging on lenses

**Step-by-step solution**

1. **Adjust the headset fit:** The most common cause of blurry visuals is a poorly fitted headset. Adjust the top strap, side straps, and rear dial until the image is sharp. The lenses should sit directly in front of your eyes.
2. **Clean the lenses:** Use a dry microfiber cloth to gently clean the lenses. Fingerprints and smudges cause blurriness. Never use liquid cleaners directly on the lenses.
3. **Adjust IPD (Interpupillary Distance):** For Meta Quest Pro and Meta Quest 2, use the IPD slider. For Meta Quest 3/3S, use the IPD adjustment wheel. Match the distance between the student's eyes — even small adjustments can dramatically improve clarity.
4. **Check for fogging:** If lenses fog up (common when the headset is cold), let it warm up to room temperature before use. Wipe gently with a microfiber cloth.
5. **For students with glasses:** Use the glasses spacer included with the headset. Ensure the student's glasses fit comfortably inside without pressing against the VR lenses.
6. **Check display settings:** Go to Settings → Display and verify brightness and refresh rate are set appropriately.

**Prevention**

- Train students on proper headset fitting before their first VR session.
- Keep microfiber cloths at each VR station.
- Allow headsets to acclimate to room temperature before use.
- Have glasses spacers readily available for students who wear glasses.`,

  "troubleshooting-mindset": `Technical problems will happen. Your mindset determines whether they derail the lesson or become minor bumps.

**Core principles**

- **Stay calm:** Students take emotional cues from you. If you're relaxed about a technical issue, they will be too.
- **Have a Plan B:** Always prepare an alternative activity that doesn't require VR. A technical failure should never mean lost learning time.
- **Know your top 3 fixes:** Most problems are solved by: (1) restarting the headset, (2) reconnecting Wi-Fi, or (3) checking the battery.
- **Don't troubleshoot during class:** If a headset has a serious issue, set it aside and use the remaining headsets. Troubleshoot after class.

**Building a troubleshooting routine**

1. **Before class:** Run through the technical checklist (charged, connected, apps tested, casting verified).
2. **During class:** If something fails, apply the 30-second rule — try one quick fix. If it doesn't work in 30 seconds, move on and use your backup plan.
3. **After class:** Document the issue, troubleshoot thoroughly, and note the solution for future reference.

**Quick reference: official Meta support links**

- [Wi-Fi troubleshooting](https://www.meta.com/en-gb/help/quest/324548839092626/)
- [PINs and access codes](https://www.meta.com/en-gb/help/quest/1396767491334420/)
- [Boundary/Guardian issues](https://www.meta.com/en-gb/help/quest/637588533755549/)
- [Login problems](https://www.meta.com/en-gb/help/quest/580216334910126/)
- [Software updates](https://www.meta.com/en-gb/help/quest/540602136930952/)
- [Casting issues](https://www.meta.com/en-gb/help/quest/214966974548157/)
- [Factory reset](https://www.meta.com/en-gb/help/quest/149134797159340/)
- [Controller pairing](https://www.meta.com/en-gb/help/quest/967070027432609/)
- [Meta Quest support](https://www.meta.com/help/support/)

**Key message**

"The goal is not a flawless technical setup — it's a great learning experience. Small technical hiccups are normal and manageable."`,
};
