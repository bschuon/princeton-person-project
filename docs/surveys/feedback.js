{
"name": "Feedback",
"description": "Feedback survey",
"pages": [
{
"id": "",
"number": 1,
"name": "Page 1",
"description": null,
"pageFlow": {
"nextPage": true,
"label": "mwForm.pageFlow.goToNextPage"
},
"elements": [
{
"id": "56b6fa09fe1f799a70cddf0a484d9427",
"orderNo": 1,
"type": "question",
"question": {
"id": "a651f77b073ead2bffd8eb75bb58ebae",
"text": "Have you participated in this survey or experiment, or a very similar one, in the past?",
"type": "radio",
"required": true,
"offeredAnswers": [
{
"id": "f55f8a82958404e319cdba5424896e07",
"orderNo": 1,
"value": "Yes",
"pageFlow": {
"nextPage": true,
"label": "mwForm.pageFlow.goToNextPage"
}
},
{
"id": "415bbc42e826c1a582ff4074416866b9",
"orderNo": 2,
"value": "No",
"pageFlow": {
"nextPage": true,
"label": "mwForm.pageFlow.goToNextPage"
}
},
{
"id": "aa987e5b9f492885af39761012b20a2d",
"orderNo": 3,
"value": "Other",
"pageFlow": {
"nextPage": true,
"label": "mwForm.pageFlow.goToNextPage"
}
}
]
}
},
{
"id": "1459534a092e028b2c041a120e006fa9",
"orderNo": 2,
"type": "question",
"question": {
"id": "7554ff1b190367593e2af2997438f815",
"text": "Did you use any strategies that might be considered cheating?",
"type": "radio",
"required": true,
"offeredAnswers": [
{
"id": "f87f336547cb3a16ff018858bb49105e",
"orderNo": 1,
"value": "Yes",
"pageFlow": {
"nextPage": true,
"label": "mwForm.pageFlow.goToNextPage"
}
},
{
"id": "43aa5f028c4f37670d0204cd205be722",
"orderNo": 2,
"value": "No",
"pageFlow": {
"nextPage": true,
"label": "mwForm.pageFlow.goToNextPage"
}
}
]
}
},
{
"id": "815ddcaa0387164cf15ffdcb890874c1",
"orderNo": 3,
"type": "question",
"question": {
"id": "a09e570df61c4f08db61dfa4de369609",
"text": "Any comments or things you would like to share with us? If not leave, this field blank",
"type": "text",
"required": true,
"pageFlowModifier": false
}
},
{
"id": "11f9ed91abb6ec9020b7d6c8bfffd848",
"orderNo": 4,
"type": "question",
"question": {
"id": "f44335d5b9d46530a959e059890aa9b0",
"text": "Did you have any technical problems in this experiment that may have influenced your results?",
"type": "radio",
"required": true,
"offeredAnswers": [
{
"id": "d033eb86adf54aafea4ae6e1c7e80d6b",
"orderNo": 1,
"value": "Yes",
"pageFlow": {
"nextPage": true,
"label": "mwForm.pageFlow.goToNextPage"
}
},
{
"id": "6e39fae653972cac13c5b07689c6d926",
"orderNo": 2,
"value": "No",
"pageFlow": {
"nextPage": true,
"label": "mwForm.pageFlow.goToNextPage"
}
}
]
}
}
],
"namedPage": true
}
]
}
