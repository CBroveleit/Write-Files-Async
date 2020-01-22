Create a simple node.js app that runs the numbered tasks below. The app should run through all of its tasks one at a time in sequence when you run `node asyncTasks.js` in its parent directory. Before starting each task log `Starting task [taskNumber]` to the console, log `Finished task [taskNumber]` after the task is complete.

Before starting the tasks the app should create a folder inside its parent directory whose path is the current unix timestamp. All files that are created by tasks should be written to this output directory. The last digit of that timestamp determines the number of files (X) that each task will create.

Task 1. Using node.js's built-in `fs` module create X numbered files named `taskOne_[fileNumber]`.
fileNumber is the order in which the files were created.
Log `Creating file [fileName]` to the console before the file is written.
Log `Finished creating file [fileName]` after the file is written.

Task 2. Create X numbered files named `taskTwo_[1-5]`.
The result should be files numbered 1-5 irrelevant of write order
The files should be written all at once without waiting for others to complete.
Log `Creating file [fileName]` to the console before the file is written.
Log `Finished creating file [fileName]` after the file is written.
Wait for all files to complete before proceeding to the next task.

Task 3. Repeat Task 1 (use `taskThree_[fileNumber]` for the filesNames) except some tasks should be written to a directory `notHome` that does not exist instead of the output directory.
These failures should be set to occur 30% of the time on average at random.
When a failure occurs log `File [fileNumber] failed to write` to the console.
The rest of the writes should continue in order and succeed.
One task selected at random should also have a 5 second delay introduced before the write occurs.
Log `Starting 5s delay at [unix timestamp]` when starting and `Ending 5s delay at [unix timestamp]` when completing.
It's OK if sometimes the failing and delayed file writes are the same.

Task 4. Repeat Task 2 (use `taskFour_[fileNumber]` for the filesNames) except some tasks should be written to a directory `notHome` that does not exist instead of the output directory.
These failures should be set to occur 30% of the time on average at random.
When a failure occurs log `File [fileNumber] failed to write` to the console.
The rest of the writes should succeed.
One task selected at random should also have a 5 second delay introduced before the write occurs.
Log `Starting 5s delay at [unix timestamp]` when starting and `Ending 5s delay at [unix timestamp]` when completing.
It's OK if sometimes the failing and delayed file writes are the same.

Task 5. Repeat task 3 except when a file fails to write the whole task should fail.

Task 6. Repeat task 4 except when a file fails to write the whole task should fail.

Task 7. Repeat task 3 except when a failure occurs 'reattempt' to write that file after a 250ms delay.
If a file fails to write more than once double the delay for each subsequent reattempt for that file.
Log `Retrying file [filename]` before starting retries instead of `Creating file [fileName]`

Task 8. Repeat task 4 except when a failure occurs 'reattempt' to write that file after a 250ms delay.
If a file fails to write more than once double the delay for each subsequent reattempt for that file.
Log `Retrying file [filename]` before starting retries instead of `Creating file [fileName]`

The program should exit cleanly.
