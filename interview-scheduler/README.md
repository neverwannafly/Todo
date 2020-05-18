# README

## Features
* Role assignment among users, i.e admin, user, super-admin etc
* Autocomple UI for filling up interviewee names
* Calendar and Table UI to display interviews
* Create/Edit/Delete interviews by only admins
* Authentication and Authorization
* Ability to upload resumes from user's profile
* Send reminder and updation mails to users prior to interview

## Development Setup
* run sidekiq server: `bundle exec sidekiq -q default -q mailers`
* run redis server:   `redis-server`
* run rails server:   `rails server`
