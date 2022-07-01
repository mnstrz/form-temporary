
# Form Temporary Values
Form temporary is plugin for save the form as temporary before submitted.
This plugin is useful if there is a failure when submitting the form

## Installation
insert file `temp.js` or `temp.min.js` into your page

## Getting started

create initial from form selector
```
formTemporary = new FormTemporary('form#form-test')
formTemporary.record()
```
All the form field automatically will saved as temporary as long as the form has not been successfully submitted

### Fields Available
- Input Text
- Input Number
- Input Password
- Input Email
- Input Date
- Input Time
- Input Range
- Select Option
- Radio Button
- Checkbox
- Textarea

## Options
Use these options if you want to fire off your own functions
to use function you can add it into `record()` function
```
formTemporary.record({
	delay : false,
	ignore : ['password']
})
```
| key | default value | possible value |
|--|--| --|
| delay | true | true / false |
| delayDuration | 1000 | |
| ignore | | ["text","date","time","range","number","email","password","select","radio","checkbox","textarea"] |
| allows| | ["text","date","time","range","number","email","password","select","radio","checkbox","textarea"] |

## Others
If you want to clear all temporary values, for example using ajax for submitting form. You can clear temporary values by
```
formTemporary.clear()
```
If you want to get current value temporary, you can use this function
```
formTemporary.getTemporary()
```
