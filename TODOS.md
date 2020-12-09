# TODOS

- Incorrect mobile number resulted in a firebase auth not permitted error
- NaN ZAR
- Initial loading state
- Test deposit flow
- Pool / Me
- Profile
  - Pending Withdrawals + Withdrawal flow
- Terms
- Crashalytics

## HARD TO DO BUT NECESSARY

- all sync actions should wait for response first (setting state to store immediately), e.g. save wallet => sync wallet called immediately

## ENHANCEMENTS

- Tests
- All tests use same setup and utils conventions
- Don't need root actions file
- When editing a wallet, if it is unchanged, don't submit
- When fetching trades, don't fetch all, get them incrementally (trades graph get all)
- ToggleSelect on load animates in
- how to properly close redux-saga channels
- Can't catch errors in redux-saga channel
- SideMenu cannot update from function body
- type reducers correctly
- how to test that onlyFlow is called again
- how to test channels
- redux-saga-test-plan test calls that were provided alll n + 1 args are undefined (calls excluded)
