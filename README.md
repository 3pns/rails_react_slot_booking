# Rails/React Slot Booking

A simple real time concurrent slot booking app for a job application using rails api mode + React SPA with create react app

## requirements

- [install docker](https://docs.docker.com/compose/install/)

## install

```
git clone my_repo
cd my_repo
docker compose up
```

## How To

```
- browse to localhost:3500
- Select a duration
- select a day
- select a slot
- click confirm
```

## Notes

- slots still available are colored black, slots taken are colored red.
- slots are displayed based on the browser timezone.
- slot overlapping is prevented using both rails validation and database constraints.
- updates are synced in real time across clients
- tests were written to ensure slot overlaping booking is not possible
- it is possible to simulate timezone changes using the browser dev tools