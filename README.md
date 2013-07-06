#Suckerpunch#
"You won't see it coming!"

===========

### Replayer

**Summary:** The Replayer is a tool for visualizing recorded data tracked using the Tracker. It will be able to show you the data in several formats:
- **Static:** graph all of the tracked lines and points at once
- **Step-Through:** graph the collected data point by point to go forward and backwards through the replay
- **Dynamic:** play back the collected data in real time as if you are watching the user

**TODO:**
- Finish the static format
- Display toggleable environment info along with all formats
- Define what's needed to create the dynamic format
- Create the dynamic replayer in real-time
- Create slow motion versions for the dynamic replayer

===========

### Styler

**Summary:** The Styler is a tool to make styling HTML with CSS easy enough that someone with little to no technical knowledge can use it. It's geared to making web design easy enough that you don't even need to know what CSS is to accomplish your design goals.

**TODO:**
- Refine basic demo to give a walkthrough of what the tool could be.
- Everything else, including making the TODO list

===========

### Tracker

**Summary:** The Tracker is a test environment for usability studies related to the Suckerpunch project. It collects info on users (both basic environment and mouse tracking). It's similar in methods to the actual data collection that would be used in a production application that utilizes the Suckerpunch concept but without as much care to performance / timing.

**TODO:**
- Break the required pieces out of session.js instead of including the full API
- Determine what performance increases might be possible, e.g. removing the jQuery dependency.
- Move from demo-tracker.js to the final format
- Add a method to reset the tracker, so you don't need to refresh to start over
- Add a method to send the data to a server for recording so when the tests are complete, we can record the data easily
- Add a few controls:
  - A user field to track which test user the data belongs to
  - A button to trigger the reset method
  - A button to trigger the send data method