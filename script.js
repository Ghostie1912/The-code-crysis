const screens={splash:document.getElementById('splashScreen'),code:document.getElementById('codeScreen'),guideIntro:document.getElementById('guideIntroScreen'),guide:document.getElementById('guideScreen'),category:document.getElementById('categoryScreen'),game:document.getElementById('gameScreen'),result:document.getElementById('resultScreen'),minigames:document.getElementById('minigamesScreen'),detective:document.getElementById('detectiveScreen'),dodge:document.getElementById('dodgeScreen'),maze:document.getElementById('mazeScreen')};
function showScreen(name){Object.values(screens).forEach(s=>s.classList.remove('active'));screens[name].classList.add('active');window.scrollTo(0,0)}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

let tutorialRunId=0;
async function typeText(el,text,speed=28,runId=null){
  el.textContent='';
  for(const ch of text){
    if(runId!==null&&runId!==tutorialRunId)return false;
    el.textContent+=ch;
    await sleep(speed);
  }
  return runId===null||runId===tutorialRunId;
}

const questionText=document.getElementById('questionText'),answerText=document.getElementById('answerText'),processText=document.getElementById('processText'),yesWrap=document.getElementById('yesWrap'),yesButton=document.getElementById('yesButton'),cursor=document.getElementById('cursor');
let splashUsed=false;

function resetTutorialState(){
  tutorialRunId++;
  guideTypeId++;
  splashUsed=false;
  questionText.textContent='';
  answerText.textContent='';
  processText.textContent='';
  cursor.style.display='';
  yesWrap.classList.add('hidden');
  yesButton.disabled=false;
  currentGuide=0;
  guideTyping=false;
  skipGuideTyping=false;
}

function goBackToIntro(){
  if(typeof stopAllMinigames==='function')stopAllMinigames();
  resetTutorialState();
  showScreen('splash');
}

function skipTutorial(){
  tutorialRunId++;
  guideTypeId++;
  guideTyping=false;
  skipGuideTyping=false;
  showScreen('category');
}

screens.splash.addEventListener('click',async e=>{
  if(e.target.closest('.tutorial-control'))return;
  if(splashUsed)return;
  splashUsed=true;
  const runId=++tutorialRunId;
  showScreen('code');
  await sleep(450);
  if(runId!==tutorialRunId)return;
  const completed=await typeText(questionText,'Hello visitor, would you like to learn how to avoid phishing and scams?',32,runId);
  if(!completed||runId!==tutorialRunId)return;
  cursor.style.display='none';
  yesWrap.classList.remove('hidden');
});

yesButton.addEventListener('click',async()=>{
  const runId=++tutorialRunId;
  yesButton.disabled=true;
  yesWrap.classList.add('hidden');
  if(!await typeText(answerText,'Yes',85,runId))return;
  await sleep(250);
  if(runId!==tutorialRunId)return;
  for(let i=0;i<3;i++){
    processText.textContent='Processing'+'.'.repeat(i+1);
    await sleep(650);
    if(runId!==tutorialRunId)return;
  }
  await sleep(450);
  if(runId!==tutorialRunId)return;
  showScreen('guideIntro');
});

screens.guideIntro.addEventListener('click',e=>{
  if(e.target.closest('.tutorial-control'))return;
  currentGuide=0;
  loadGuideCard(true);
  showScreen('guide');
});

document.querySelectorAll('.back-intro').forEach(button=>{
  button.addEventListener('click',e=>{
    e.stopPropagation();
    goBackToIntro();
  });
});

document.querySelectorAll('.skip-tutorial').forEach(button=>{
  button.addEventListener('click',e=>{
    e.stopPropagation();
    skipTutorial();
  });
});
const guideCards=[
{title:'How to Stay Safe from Phishing and Scams',body:'Scammers often try to make messages look real so that you act quickly without thinking. Before clicking, replying, downloading, or sharing information, look for warning signs.'},
{title:'1. Check Who Sent It',body:"Always look carefully at the sender's email address, phone number, or account name. A scammer may use a name that looks familiar while using a strange or fake address.\n\nExample: A message says it is from Apple, but the email address is applehelp247@gmail.com."},
{title:'2. Be Careful with Urgent Messages',body:'Scammers often try to scare you or rush you.\n\nWatch out for messages like:\n• “Your account will be deleted today!”\n• “Pay immediately!”\n• “You have only 10 minutes to respond!”\n• “Your account has been hacked!”\n\nTake your time and check whether the message is real.'},
{title:'3. Think Before You Click',body:"Do not click a link just because it looks official. Scam links can lead to fake websites that steal your password or personal information.\n\nIf a message claims to be from a company, open the company's official app or website yourself instead of using the link in the message."},
{title:'4. Never Share Private Information',body:'Do not give strangers information such as:\n• Passwords\n• Verification codes\n• Bank or card details\n• Your home address\n• Your school or workplace information\n• Personal identification numbers\n\nA real company should never randomly ask you to send your password.'},
{title:'5. Watch Out for Offers That Seem Too Good to Be True',body:'“Congratulations! You won $5,000!”\n\n“You have been chosen for a free iPhone!”\n\nThese messages are often designed to make people excited so they stop thinking carefully. If you did not enter a competition, it is very unlikely that you suddenly won one.'},
{title:'6. Be Careful with Downloads and Apps',body:'Never download an app or file from a suspicious message or website.\n\nBefore installing an app:\n• Check who created it.\n• Read its reviews.\n• Download it from an official app store.\n• Check what permissions it asks for.\n\nFor example, a calculator app should probably not need access to your contacts, microphone, and messages.'},
{title:'7. Look Carefully at Websites',body:'Fake websites can look almost identical to real ones.\n\nCheck:\n• The website address.\n• Strange spelling in the URL.\n• Poor-quality images or writing.\n• Unexpected pop-ups.\n• Requests for unusual information.\n\nFor example, amaz0n-login.com is not the same as the real Amazon website.'},
{title:'8. Verify Unexpected Messages',body:'Someone may pretend to be your friend, relative, teacher, or another person you trust.\n\nIf someone suddenly messages you from a new number and asks for money, your address, passwords, or private information, verify who they are first.\n\nContact the real person using a number or account you already know.'},
{title:'9. Ask Someone You Trust',body:'If you are unsure, you do not have to make the decision alone.\n\nAsk:\n• A parent\n• A teacher\n• A trusted friend\n• Another responsible adult\n\nIt is better to double-check than to give information to the wrong person.'},
{title:'10. Stop, Check, Then Act',body:'STOP — Do not rush.\nCHECK — Look for warning signs.\nVERIFY — Make sure the person, website, or company is real.\nACT — Only continue when you are sure it is safe.\n\nRemember: scammers depend on people acting quickly. Slow down, check carefully, and never be afraid to ask for help.'}
];
const guideDeck=document.getElementById('guideDeck'),guideCard=document.getElementById('guideCard'),guideNumber=document.getElementById('guideNumber'),guideTitle=document.getElementById('guideTitle'),guideBody=document.getElementById('guideBody'),guideCounter=document.getElementById('guideCounter'),guideProgress=document.getElementById('guideProgress'),guidePrevButton=document.getElementById('guidePrevButton'),guideNextButton=document.getElementById('guideNextButton');
let currentGuide=0,guideTyping=false,skipGuideTyping=false,guideTypeId=0;

async function typeGuideBody(text){
  const thisTypeId=++guideTypeId;
  guideTyping=true;
  skipGuideTyping=false;
  guideBody.textContent='';
  for(let i=0;i<text.length;i++){
    if(thisTypeId!==guideTypeId)return;
    if(skipGuideTyping){
      guideBody.textContent=text;
      break;
    }
    guideBody.textContent+=text[i];
    await sleep(11);
  }
  if(thisTypeId===guideTypeId)guideTyping=false;
}

function updateGuideNav(){
  guidePrevButton.disabled=currentGuide===0;
  guideNextButton.textContent=currentGuide===guideCards.length-1?'Start challenges →':'Next note →';
}

function loadGuideCard(first=false,direction='forward'){
  const card=guideCards[currentGuide],num=String(currentGuide+1).padStart(2,'0');
  guideNumber.textContent=num;
  guideCounter.textContent=`${num} / ${String(guideCards.length).padStart(2,'0')}`;
  guideProgress.style.width=`${((currentGuide+1)/guideCards.length)*100}%`;
  guideTitle.textContent=card.title;
  guideCard.classList.remove('exit','enter','exit-back','enter-back');
  if(!first){
    void guideCard.offsetWidth;
    guideCard.classList.add(direction==='back'?'enter-back':'enter');
  }
  updateGuideNav();
  typeGuideBody(card.body);
}

async function nextGuide(){
  if(guideTyping){
    skipGuideTyping=true;
    return;
  }
  if(currentGuide>=guideCards.length-1){
    showScreen('category');
    return;
  }
  guideTypeId++;
  guideTyping=false;
  guideCard.classList.remove('exit-back');
  guideCard.classList.add('exit');
  await sleep(420);
  currentGuide++;
  loadGuideCard(false,'forward');
}

async function previousGuide(){
  if(currentGuide<=0)return;
  guideTypeId++;
  guideTyping=false;
  skipGuideTyping=false;
  guideCard.classList.remove('exit');
  guideCard.classList.add('exit-back');
  await sleep(380);
  currentGuide--;
  loadGuideCard(false,'back');
}

guideDeck.addEventListener('click',nextGuide);
guideDeck.addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){
    e.preventDefault();
    nextGuide();
  }else if(e.key==='ArrowLeft'){
    e.preventDefault();
    previousGuide();
  }else if(e.key==='ArrowRight'){
    e.preventDefault();
    nextGuide();
  }
});
guidePrevButton.addEventListener('click',previousGuide);
guideNextButton.addEventListener('click',nextGuide);

// =========================================================
// ADD OR EDIT SCENARIOS HERE WITH YOUR FRIENDS
// =========================================================
const scenarios={
messages:[
{title:"A Relative You Haven't Heard From",start:'visitor',steps:{visitor:{contact:'Unknown Number',messages:[{from:'them',text:"Heyyy! It's your cousin. I got a new number 😭"},{from:'them',text:"I haven't seen you in forever. What's your home address again? I want to send something."}],choices:[{text:'Send your address because they said they are family.',result:'fail',explanation:'Someone can pretend to be a relative. Your home address is private information, so verify who they are first.'},{text:'Text your mom using the number you already know and ask if this person is really your cousin.',next:'mom'},{text:'Ask the unknown person for more personal family information.',result:'fail',explanation:'A scammer may already know family information from social media. Verify the person through a trusted contact instead.'}]},mom:{contact:'Mom',messages:[{from:'me',text:"Mom, someone with a new number says they're my cousin and wants our address. Is this actually them?"},{from:'them',text:"No. I just called your cousin. That's not their number. Don't reply and block it."}],choices:[{text:"Block the unknown number and don't share anything.",result:'win',explanation:'Perfect. You verified the identity through a trusted person before sharing private information.'},{text:'Reply anyway, just to see what they want.',result:'fail',explanation:'Once you know the account is fake, the safest choice is to stop engaging and block it.'}]}}},
{title:'The Delivery Text',start:'main',steps:{main:{contact:'Unknown Number',messages:[{from:'them',text:'Your package could not be delivered. A 0.500 BHD fee is required.'},{from:'them',text:'Pay now: delivery-update.example'}],choices:[{text:'Open the link because the fee is small.',result:'fail',explanation:'Small payment requests are often used to steal card details on fake delivery websites.'},{text:"Check the order from the shop or delivery company's official app instead.",result:'win',explanation:'Exactly. Check delivery information through an official app, website, or number you already trust.'},{text:'Reply with your card number so they can charge the fee.',result:'fail',explanation:'Never send card details through a random message.'}]}}}
],
emails:[
{title:'Your Account Will Be Deleted',from:'Apple Support <applehelp247@gmail.com>',subject:'URGENT: Your Apple ID will be deleted today',body:'We detected suspicious activity. Confirm your password immediately using the link below or your account will be permanently deleted.',linkText:'VERIFY ACCOUNT NOW',choices:[{text:'Click the email link before the account gets deleted.',result:'fail',explanation:'The message uses urgency and the sender address is suspicious. Do not trust the link.'},{text:"Check the sender address, then open Apple's official app or website yourself.",result:'win',explanation:'Great choice. You checked the warning signs and used an official route instead of the email link.'},{text:'Reply to the email with your password.',result:'fail',explanation:'Never send your password by email.'}]},
{title:'You Won a Prize',from:'Rewards Team <winner.claim.center@outlook.com>',subject:'CONGRATULATIONS! YOU WON A NEW PHONE',body:'You have been selected as today’s lucky winner. To receive your free phone, enter your name, home address, card number and verification code.',linkText:'CLAIM MY PRIZE',choices:[{text:"Claim it because you don't want the prize to expire.",result:'fail',explanation:'A prize you never entered for is a warning sign, especially when it asks for card details.'},{text:'Report the email as phishing and delete it.',result:'win',explanation:'Correct. The sender, unexpected prize, and request for sensitive information are all scam signs.'},{text:'Forward it to friends so they can try too.',result:'fail',explanation:'Forwarding scam messages can expose other people to the same risk.'}]}
],
applications:[
{title:'The Suspicious Calculator',appName:'Ultra Calculator Pro',developer:'Unknown Dev Studio',icon:'⌗',permissions:['Microphone','Contacts','Messages','Precise location'],choices:[{text:'Allow every permission. Apps need access to work.',result:'fail',explanation:'A calculator does not normally need your microphone, contacts, messages, and location.'},{text:'Cancel, check the developer, and choose a trusted calculator from the official app store.',result:'win',explanation:"Exactly. Permissions should make sense for the app's purpose, and the developer should be trustworthy."},{text:'Install it first and remove permissions later.',result:'fail',explanation:'It is safer to check before installing and before giving an app access to your information.'}]},
{title:'A Game From a Random Website',appName:'Galaxy Rush FREE MOD',developer:'Download uploaded by: xX_FreeGames_Xx',icon:'★',permissions:['Install unknown apps','Files and photos','Accessibility controls'],choices:[{text:'Install it because the paid game is free here.',result:'fail',explanation:'Unofficial modified apps can contain malware or steal data.'},{text:'Leave the page and use the official app store instead.',result:'win',explanation:'Correct. Official stores and verified developers are safer than random download pages.'},{text:'Turn off security so the phone lets you install it.',result:'fail',explanation:'Disabling security warnings to install an unknown app increases the risk.'}]}
],
websites:[
{title:'The Virus Pop-up',url:'free-cleaner-now.example/security-check',heading:'⚠ YOUR DEVICE HAS 7 VIRUSES!',text:'Download our cleaner within 30 seconds or your photos may be deleted.',buttonText:'DOWNLOAD CLEANER NOW',choices:[{text:'Download the cleaner immediately.',result:'fail',explanation:'Random websites cannot reliably scan your whole device like this. Scare tactics and countdowns are common scam tricks.'},{text:"Close the page and use your device's official security tools if you are worried.",result:'win',explanation:'Correct. Do not install software from a frightening pop-up.'},{text:'Enter your email so the website can send you the cleaner.',result:'fail',explanation:'Do not give personal information to a suspicious website.'}]},
{title:'The Almost-Correct Login Page',url:'micros0ft-login.example/signin',heading:'Sign in to continue',text:'Your session expired. Enter your school email and password to continue.',buttonText:'SIGN IN',choices:[{text:'Enter your password because the page looks professional.',result:'fail',explanation:'A page can look professional and still be fake. The URL is misspelled.'},{text:'Check the URL carefully and go to the official site yourself instead.',result:'win',explanation:'Exactly. The address matters more than how convincing the page looks.'},{text:'Try an old password first to see if the website accepts it.',result:'fail',explanation:'Do not enter any password into a suspicious page.'}]}
]};

const scenarioHost=document.getElementById('scenarioHost'),gameCategory=document.getElementById('gameCategory'),roundLabel=document.getElementById('roundLabel');let currentCategory='messages',currentScenario=null,currentMessageStep=null;const lastIndex={};
function pretty(s){return s.charAt(0).toUpperCase()+s.slice(1)}function randomScenario(category){const list=scenarios[category];let i=Math.floor(Math.random()*list.length);if(list.length>1&&i===lastIndex[category])i=(i+1)%list.length;lastIndex[category]=i;return list[i]}
function startCategory(category){currentCategory=category;currentScenario=randomScenario(category);gameCategory.textContent=pretty(category);roundLabel.textContent=`random scenario • ${scenarios[category].length} available`;if(category==='messages')currentMessageStep=currentScenario.start;renderScenario();showScreen('game')}
document.querySelectorAll('.category-card').forEach(b=>b.addEventListener('click',()=>startCategory(b.dataset.category)));document.getElementById('backToCategories').addEventListener('click',()=>showScreen('category'));
function renderChoices(choices){return `<div class="choices">${choices.map((c,i)=>`<button class="choice" type="button" data-choice="${i}">${c.text}</button>`).join('')}</div>`}function bindChoices(choices){scenarioHost.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>{const c=choices[Number(b.dataset.choice)];if(c.next){currentMessageStep=c.next;renderMessage();return}showResult(c.result==='win',c.explanation)}))}
function renderScenario(){if(currentCategory==='messages')renderMessage();if(currentCategory==='emails')renderEmail();if(currentCategory==='applications')renderApp();if(currentCategory==='websites')renderWebsite()}
function renderMessage(){const step=currentScenario.steps[currentMessageStep],initial=step.contact.charAt(0).toUpperCase();scenarioHost.innerHTML=`<article class="scenario-shell"><div class="scenario-top"><h2>${currentScenario.title}</h2><p>Choose the reply or action you think is safest.</p></div><div class="scenario-content"><div class="phone-frame"><div class="phone-screen"><div class="notch"></div><div class="contact"><div class="avatar">${initial}</div><div class="contact-name">${step.contact}</div></div><div class="message-area">${step.messages.map(m=>`<div class="bubble ${m.from}">${m.text}</div>`).join('')}<img class="typing-img" src="assets/typing-bubble.png" alt="Typing…"></div><div class="compose">iMessage</div></div></div>${renderChoices(step.choices)}</div></article>`;bindChoices(step.choices)}
function renderEmail(){const s=currentScenario;scenarioHost.innerHTML=`<article class="scenario-shell"><div class="scenario-top"><h2>${s.title}</h2><p>Look closely before you choose what to do.</p></div><div class="scenario-content"><div class="mail"><div class="mail-top"><i></i><i></i><i></i></div><div class="mail-head"><h3>${s.subject}</h3><div class="mail-meta"><b>From:</b> ${s.from}</div></div><div class="mail-body"><p>${s.body}</p><span class="fake-link">${s.linkText}</span></div></div>${renderChoices(s.choices)}</div></article>`;bindChoices(s.choices)}
function renderApp(){const s=currentScenario;scenarioHost.innerHTML=`<article class="scenario-shell"><div class="scenario-top"><h2>${s.title}</h2><p>Decide whether the app request makes sense.</p></div><div class="scenario-content"><div class="app-preview"><div class="app-row"><div class="app-icon">${s.icon}</div><div><h3>${s.appName}</h3><p>${s.developer}</p></div></div><div class="perm"><h4>This app wants permission to access:</h4><ul>${s.permissions.map(p=>`<li>${p}</li>`).join('')}</ul></div></div>${renderChoices(s.choices)}</div></article>`;bindChoices(s.choices)}
function renderWebsite(){const s=currentScenario;scenarioHost.innerHTML=`<article class="scenario-shell"><div class="scenario-top"><h2>${s.title}</h2><p>Look at both the page and the address bar.</p></div><div class="scenario-content"><div class="browser"><div class="browser-top"><div class="url">${s.url}</div></div><div class="site-page"><div class="alert"><h3>${s.heading}</h3><p>${s.text}</p><span class="fake-download">${s.buttonText}</span></div></div></div>${renderChoices(s.choices)}</div></article>`;bindChoices(s.choices)}
const resultPanel=document.getElementById('resultPanel'),resultIcon=document.getElementById('resultIcon'),resultTag=document.getElementById('resultTag'),resultTitle=document.getElementById('resultTitle'),resultMessage=document.getElementById('resultMessage'),resultExplanation=document.getElementById('resultExplanation'),victorySound=document.getElementById('victorySound'),celebration=document.getElementById('celebration');
function showResult(won,explanation){resultPanel.classList.remove('success','fail');resultPanel.classList.add(won?'success':'fail');celebration.classList.toggle('on',won);if(won){resultIcon.textContent='🛡️✨';resultTag.textContent='SAFE CHOICE';resultTitle.textContent='Great job!';resultMessage.textContent='You successfully avoided getting scammed!';if(victorySound){victorySound.pause();victorySound.currentTime=0;victorySound.play().catch(()=>{})}}else{resultIcon.textContent='⚠';resultTag.textContent='SCAMMED';resultTitle.textContent='You got scammed';resultMessage.textContent='You should be more careful next time.';if(victorySound){victorySound.pause();victorySound.currentTime=0}}resultExplanation.textContent=explanation;showScreen('result')}
document.getElementById('retryButton').addEventListener('click',()=>{celebration.classList.remove('on');currentScenario=randomScenario(currentCategory);if(currentCategory==='messages')currentMessageStep=currentScenario.start;renderScenario();showScreen('game')});document.getElementById('resultCategoriesButton').addEventListener('click',()=>{celebration.classList.remove('on');showScreen('category')});

// =========================================================
// MINIGAMES SECTION
// =========================================================

const goToMinigames=document.getElementById('goToMinigames');
const resultMinigamesButton=document.getElementById('resultMinigamesButton');
const backToChallenges=document.getElementById('backToChallenges');

function openMinigames(){
  stopAllMinigames();
  celebration.classList.remove('on');
  showScreen('minigames');
}

goToMinigames.addEventListener('click',openMinigames);
resultMinigamesButton.addEventListener('click',openMinigames);
backToChallenges.addEventListener('click',()=>showScreen('category'));

document.querySelectorAll('.back-minigames').forEach(button=>{
  button.addEventListener('click',()=>{
    stopAllMinigames();
    showScreen('minigames');
  });
});

document.querySelectorAll('.minigame-card').forEach(button=>{
  button.addEventListener('click',()=>{
    const game=button.dataset.minigame;
    stopAllMinigames();
    if(game==='detective'){
      loadDetectiveCase();
      showScreen('detective');
    }
    if(game==='dodge'){
      resetDodgePreview();
      showScreen('dodge');
    }
    if(game==='maze'){
      resetMazePreview();
      showScreen('maze');
    }
  });
});

function stopAllMinigames(){
  stopDodgeGame();
  mazeActive=false;
}

// =========================================================
// MINIGAME 1 — DETECTIVE CASE FILES
// =========================================================

const detectiveCases=[
  {
    id:'001',
    title:'The Locked School Account',
    brief:'A student lost access to her school account after responding to an urgent email. Study how the incident unfolded, then write your own report.',
    nodes:[
      {id:'n1',x:55,y:45,w:230,title:'8:14 PM — New Email',text:'An email arrives saying the school account has unusual activity.'},
      {id:'n2',x:345,y:35,w:245,title:'The Sender',text:'school-support739@gmail.com'},
      {id:'n3',x:625,y:120,w:245,title:'The Warning',text:'“ACT NOW. Your account will be deleted tonight.”'},
      {id:'n4',x:345,y:235,w:245,title:'The Link',text:'school-login-security.net'},
      {id:'n5',x:70,y:330,w:245,title:'What Happened Next',text:'The student entered her school email and password on the page.'},
      {id:'n6',x:610,y:350,w:250,title:'11:02 PM — Account Changed',text:'The password and recovery email were changed by someone else.'}
    ],
    links:[['n1','n2'],['n2','n3'],['n1','n5'],['n3','n4'],['n4','n5'],['n5','n6'],['n2','n4']],
    concepts:{
      signs:[
        ['gmail','personal email','unofficial sender','strange sender','suspicious sender','fake sender'],
        ['urgent','urgency','act now','deleted','rush','pressure','threat'],
        ['fake link','suspicious link','strange link','url','domain','school-login-security','not official'],
        ['password','login details','credentials','asked to log in','entered password']
      ],
      type:[['phishing','phish','credential phishing','fake login']],
      prevention:[
        [
          'official website','official site','school website','school portal',
          'go directly','open official','use official site','use the official website'
        ],
        [
          'check sender','verify sender','check email','verify email',
          'check who sent it','confirm sender','confirm email'
        ],
        [
          'dont click','do not click','avoid link','not click',
          'ignore','ignore it','ignored it','ignoring it','ignore message',
          'ignore the message','do not respond','dont respond','not respond',
          'do not reply','dont reply','not reply','avoid responding',
          'do not interact','dont interact','not interact','delete message',
          'leave it alone'
        ],
        [
          'ask teacher','ask school','contact school','trusted adult','verify with school',
          'school employee','trusted school employee','school staff','trusted school staff',
          'staff member','trusted staff','school worker','teacher','school administrator',
          'school admin','it department','school it','tech support',
          'talk to school','talking to school','talk to a teacher','talking to a teacher',
          'talk to school staff','talking to school staff',
          'talk to a school employee','talking to a school employee',
          'speak to school','speak to a teacher','speak to school staff',
          'tell a teacher','tell school staff','report it to school',
          'report to school','ask a school employee','check with school staff'
        ]
      ]
    }
  },
  {
    id:'002',
    title:'The “Cousin” From a New Number',
    brief:'Someone claims to be a relative and asks for private information. Trace the messages and decide what should have raised suspicion.',
    nodes:[
      {id:'n1',x:65,y:45,w:230,title:'6:42 PM — Unknown Number',text:'“Hey! It’s your cousin. I got a new number.”'},
      {id:'n2',x:355,y:35,w:235,title:'The Request',text:'“What’s your home address again? I want to send something.”'},
      {id:'n3',x:625,y:155,w:235,title:'More Pressure',text:'“I need it now because the delivery closes soon.”'},
      {id:'n4',x:345,y:245,w:245,title:'A Detail Feels Off',text:'The person avoids a video call and will not say which cousin they are.'},
      {id:'n5',x:70,y:350,w:245,title:'Trusted Check',text:'A parent calls the real cousin using the old saved number.'},
      {id:'n6',x:615,y:360,w:245,title:'The Truth',text:'The real cousin says they never changed their number.'}
    ],
    links:[['n1','n2'],['n2','n3'],['n2','n4'],['n3','n4'],['n4','n5'],['n5','n6']],
    concepts:{
      signs:[
        ['unknown number','new number','different number'],
        ['address','home address','private information','personal information'],
        ['urgent','urgency','need it now','pressure','rush'],
        ['avoid video','would not video','refused video','wouldnt say','could not verify','identity']
      ],
      type:[['impersonation','impersonator','social engineering','family scam','relative scam','identity scam']],
      prevention:[
        [
          'call real cousin','old number','known number','saved number','contact directly',
          'call them directly','contact them directly','use the saved number'
        ],
        [
          'ask parent','ask mom','ask dad','trusted adult','trusted person',
          'talk to parent','talking to parent','tell parent','speak to parent',
          'ask someone trusted','talk to someone trusted'
        ],
        [
          'verify identity','check identity','verify person','confirm identity',
          'check who they are','make sure it is them'
        ],
        [
          'dont share address','do not share address','not share information','keep address private',
          'ignore','ignore it','ignore message','do not respond','dont respond',
          'do not reply','dont reply','not reply','do not share','dont share'
        ]
      ]
    }
  }
];

const detectiveScreen=document.getElementById('detectiveScreen');
const caseJourney=document.getElementById('caseJourney');
const caseStage=document.getElementById('caseStage');
const caseWorld=document.getElementById('caseWorld');
const caseStoryCards=document.getElementById('caseStoryCards');
const casePathLines=document.getElementById('casePathLines');
const caseStepLabel=document.getElementById('caseStepLabel');
const detectiveNextClue=document.getElementById('detectiveNextClue');
const detectiveReport=document.getElementById('detectiveReport');
const detectiveCaseChip=document.getElementById('detectiveCaseChip');
const detectiveCaseTitle=document.getElementById('detectiveCaseTitle');
const detectiveCaseBrief=document.getElementById('detectiveCaseBrief');
const detectiveSigns=document.getElementById('detectiveSigns');
const detectiveKeyClue=document.getElementById('detectiveKeyClue');
const detectivePrevention=document.getElementById('detectivePrevention');
const detectiveScanResult=document.getElementById('detectiveScanResult');

let detectiveCaseIndex=-1;
let detectiveStoryStep=0;
let detectiveMoving=false;
let detectiveStoryNodes=[];
let activeDetectiveCase=null;

const BOARD_WIDTH=2600;
const BOARD_HEIGHT=1700;

/*
  Turn the original case coordinates into a much larger board.
  This creates enough physical distance that the player can clearly SEE
  the board travel left/right/up/down between pins.
*/
function detectiveDisplayNode(node,index){
  const spreadPositions=[
    {x:330,y:300},
    {x:1120,y:240},
    {x:1800,y:610},
    {x:1180,y:990},
    {x:390,y:1220},
    {x:1850,y:1280}
  ];

  const fallback={
    x:360+(index%3)*760,
    y:280+Math.floor(index/3)*760
  };

  const pos=spreadPositions[index]||fallback;

  return {
    ...node,
    dx:pos.x,
    dy:pos.y,
    dw:Math.max(340,Math.round(node.w*1.48))
  };
}

function makeBoardCard(node,index){
  const card=document.createElement('article');

  card.className='case-story-card detective-board-card';
  card.dataset.storyIndex=index;

  card.style.left=`${node.dx}px`;
  card.style.top=`${node.dy}px`;
  card.style.width=`${node.dw}px`;

  card.innerHTML=`
    <div class="board-card-pin" aria-hidden="true">
      <i></i>
    </div>

    <div class="board-card-tab">
      <span>CASE FILE</span>
      <b>${String(index+1).padStart(2,'0')}</b>
    </div>

    <p class="board-card-kicker">EVIDENCE ${String(index+1).padStart(2,'0')}</p>

    <h3>${node.title}</h3>

    <div class="board-card-rule"></div>

    <p>${node.text}</p>

    <div class="board-card-stamp">REVIEWED</div>
  `;

  caseStoryCards.appendChild(card);

  return card;
}

function cardAnchor(node){
  return {
    x:node.dx+node.dw/2,
    y:node.dy+8
  };
}

function addDetectiveConnection(fromNode,toNode,index,network=false){
  const a=cardAnchor(fromNode);
  const b=cardAnchor(toNode);

  const line=document.createElementNS(
    'http://www.w3.org/2000/svg',
    'line'
  );

  line.setAttribute('x1',a.x);
  line.setAttribute('y1',a.y);
  line.setAttribute('x2',b.x);
  line.setAttribute('y2',b.y);

  line.classList.add(
    'case-path-line',
    network?'board-string-network':'board-string-story'
  );

  line.style.setProperty(
    '--string-delay',
    `${Math.max(0,index)*70}ms`
  );

  casePathLines.appendChild(line);
  return line;
}

function buildBoard(){
  caseStoryCards.innerHTML='';
  casePathLines.innerHTML='';

  detectiveStoryNodes.forEach(
    (node,index)=>{
      makeBoardCard(node,index);
    }
  );

  /*
    Draw the full detective network very faintly in the background.
    The route the player is currently following becomes brighter as
    they move from pin to pin.
  */
  if(activeDetectiveCase&&activeDetectiveCase.links){
    const byId=new Map(
      detectiveStoryNodes.map(node=>[node.id,node])
    );

    activeDetectiveCase.links.forEach(
      (pair,index)=>{
        const from=byId.get(pair[0]);
        const to=byId.get(pair[1]);

        if(from&&to){
          addDetectiveConnection(
            from,
            to,
            index,
            true
          );
        }
      }
    );
  }

  updateBoardCardStates();
}

function updateBoardCardStates(){
  caseStoryCards
    .querySelectorAll('.detective-board-card')
    .forEach((card,index)=>{
      card.classList.toggle(
        'board-card-current',
        index===detectiveStoryStep
      );

      card.classList.toggle(
        'board-card-seen',
        index<=detectiveStoryStep
      );

      card.classList.toggle(
        'board-card-future',
        index>detectiveStoryStep
      );
    });
}

function getFocusTransform(node,zoom=1.24){
  const rect=caseStage.getBoundingClientRect();

  const targetX=
    node.dx+node.dw/2;

  const targetY=
    node.dy+120;

  const tx=
    rect.width/2-targetX*zoom;

  const ty=
    rect.height/2-targetY*zoom;

  return {tx,ty,zoom};
}

function applyBoardTransform(transform,instant=false){
  if(instant){
    caseWorld.classList.add('board-instant');
  }

  caseWorld.style.transform=
    `translate(${transform.tx}px, ${transform.ty}px) scale(${transform.zoom})`;

  if(instant){
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        caseWorld.classList.remove('board-instant');
      });
    });
  }
}

function focusDetectiveNode(index,instant=false){
  const node=
    detectiveStoryNodes[index];

  applyBoardTransform(
    getFocusTransform(node),
    instant
  );

  updateBoardCardStates();
  updateDetectiveStepUI();
}

function drawStoryString(fromIndex,toIndex){
  const from=
    detectiveStoryNodes[fromIndex];

  const to=
    detectiveStoryNodes[toIndex];

  const line=
    addDetectiveConnection(
      from,
      to,
      toIndex,
      false
    );

  line.classList.add(
    'board-string-drawing'
  );
}

function directionName(from,to){
  const a=cardAnchor(from);
  const b=cardAnchor(to);

  const dx=b.x-a.x;
  const dy=b.y-a.y;

  if(Math.abs(dx)>Math.abs(dy)*1.5){
    return dx>0?'RIGHT':'LEFT';
  }

  if(Math.abs(dy)>Math.abs(dx)*1.5){
    return dy>0?'DOWN':'UP';
  }

  if(dx>0&&dy>0)return 'DOWN RIGHT';
  if(dx>0&&dy<0)return 'UP RIGHT';
  if(dx<0&&dy>0)return 'DOWN LEFT';

  return 'UP LEFT';
}

function updateDetectiveStepUI(){
  const total=
    detectiveStoryNodes.length;

  const hint=
    document.getElementById(
      'caseClickHintText'
    );

  caseStepLabel.textContent=
    `Evidence ${detectiveStoryStep+1} of ${total}`;

  if(hint){
    if(detectiveStoryStep===total-1){
      hint.textContent=
        'Click anywhere to pull back and reveal the whole case';
    }else{
      hint.textContent=
        'Click anywhere to follow the red string';
    }
  }
}

/* =========================================================
   THE ACTUAL DETECTIVE-BOARD TRANSITION
   ========================================================= */

async function travelToNextBoardClue(fromIndex,toIndex){
  const from=
    detectiveStoryNodes[fromIndex];

  const to=
    detectiveStoryNodes[toIndex];

  caseStage.classList.add(
    'detective-board-moving'
  );

  caseStage.dataset.direction=
    directionName(from,to);

  /*
    Bright red string grows toward the next pin while the whole board
    physically moves beneath the screen.
  */
  drawStoryString(
    fromIndex,
    toIndex
  );

  await sleep(90);

  detectiveStoryStep=
    toIndex;

  updateBoardCardStates();
  updateDetectiveStepUI();

  /*
    This transition is deliberately long enough to SEE the board
    moving vertically/horizontally/diagonally.
  */
  applyBoardTransform(
    getFocusTransform(to,1.24),
    false
  );

  await sleep(1450);

  caseStage.classList.remove(
    'detective-board-moving'
  );

  delete caseStage.dataset.direction;
}

/* =========================================================
   FINAL PULL BACK
   ========================================================= */

async function showDetectiveOverviewAndQuestions(){
  detectiveMoving=true;

  caseStage.classList.add(
    'detective-board-pulling-back'
  );

  caseStoryCards
    .querySelectorAll('.detective-board-card')
    .forEach(card=>{
      card.classList.remove(
        'board-card-current',
        'board-card-future'
      );

      card.classList.add(
        'board-card-seen',
        'board-card-overview'
      );
    });

  /*
    FIRST resize the final overview box.
    The previous version measured the full-screen stage first and only
    shrank the box afterward, which made the board look shifted right.
  */
  caseJourney.classList.add(
    'case-finished'
  );

  /*
    Wait for the overview container to finish resizing before measuring.
    Then the centering calculation uses its REAL final width and height.
  */
  await sleep(650);

  const rect=
    caseStage.getBoundingClientRect();

  /*
    Fit the ACTUAL evidence cluster, not the giant empty cork board.
  */
  const overviewPadding=135;

  const minX=
    Math.min(
      ...detectiveStoryNodes.map(
        node=>node.dx
      )
    )-overviewPadding;

  const minY=
    Math.min(
      ...detectiveStoryNodes.map(
        node=>node.dy
      )
    )-overviewPadding;

  const maxX=
    Math.max(
      ...detectiveStoryNodes.map(
        node=>node.dx+node.dw
      )
    )+overviewPadding;

  const maxY=
    Math.max(
      ...detectiveStoryNodes.map(
        node=>node.dy+310
      )
    )+overviewPadding;

  const contentWidth=
    maxX-minX;

  const contentHeight=
    maxY-minY;

  const overviewScale=
    Math.min(
      (rect.width-70)/contentWidth,
      (rect.height-60)/contentHeight,
      .72
    );

  /*
    Exact center of the evidence cluster -> exact center of final stage.
  */
  const contentCenterX=
    (minX+maxX)/2;

  const contentCenterY=
    (minY+maxY)/2;

  const tx=
    rect.width/2
    -contentCenterX*overviewScale;

  const ty=
    rect.height/2
    -contentCenterY*overviewScale;

  caseWorld.style.transform=
    `translate(${tx}px, ${ty}px) scale(${overviewScale})`;

  updateDetectiveStepUI();

  const hint=
    document.getElementById(
      'caseClickHintText'
    );

  if(hint){
    hint.textContent=
      'Case reconstructed';
  }

  await sleep(1350);

  caseStage.classList.remove(
    'detective-board-pulling-back'
  );

  caseStage.classList.add(
    'case-overview'
  );

  await sleep(250);

  detectiveReport.classList.remove(
    'detective-report-hidden'
  );

  detectiveReport.classList.add(
    'detective-report-show'
  );

  detectiveReport.scrollIntoView({
    behavior:'smooth',
    block:'start'
  });

  detectiveMoving=false;
}

function loadDetectiveCase(){
  let next=
    Math.floor(
      Math.random()*
      detectiveCases.length
    );

  if(
    detectiveCases.length>1 &&
    next===detectiveCaseIndex
  ){
    next=
      (next+1)%
      detectiveCases.length;
  }

  detectiveCaseIndex=next;
  activeDetectiveCase=detectiveCases[next];

  detectiveStoryStep=0;
  detectiveMoving=false;

  detectiveStoryNodes=
    activeDetectiveCase.nodes.map(
      detectiveDisplayNode
    );

  detectiveScreen.classList.add(
    'detective-cinematic',
    'detective-board-mode'
  );

  detectiveScreen.classList.remove(
    'detective-slideshow-mode'
  );

  caseJourney.classList.remove(
    'case-finished'
  );

  caseStage.classList.remove(
    'case-overview',
    'detective-board-moving',
    'detective-board-pulling-back'
  );

  detectiveCaseChip.textContent=
    `CASE #${activeDetectiveCase.id}`;

  detectiveCaseTitle.textContent=
    activeDetectiveCase.title;

  detectiveCaseBrief.textContent=
    'Follow the pinned evidence across the detective board. Click anywhere to travel along the case, then write your investigation report.';

  detectiveSigns.value='';
  detectiveKeyClue.value='';
  detectivePrevention.value='';

  detectiveScanResult.className=
    'scan-result';

  detectiveScanResult.innerHTML='';

  detectiveReport.classList.add(
    'detective-report-hidden'
  );

  detectiveReport.classList.remove(
    'detective-report-show'
  );

  caseWorld.style.opacity='1';
  caseWorld.style.visibility='visible';

  buildBoard();

  requestAnimationFrame(()=>{
    focusDetectiveNode(
      0,
      true
    );
  });
}

async function nextDetectiveStoryStep(){
  if(detectiveMoving){
    return;
  }

  if(
    caseStage.classList.contains(
      'case-overview'
    )
  ){
    return;
  }

  if(
    detectiveStoryStep>=
    detectiveStoryNodes.length-1
  ){
    await showDetectiveOverviewAndQuestions();
    return;
  }

  detectiveMoving=true;

  const fromIndex=
    detectiveStoryStep;

  const toIndex=
    detectiveStoryStep+1;

  await travelToNextBoardClue(
    fromIndex,
    toIndex
  );

  detectiveMoving=false;
}

caseStage.addEventListener(
  'click',
  event=>{
    if(
      event.target.closest(
        'button,input,textarea,a'
      )
    ){
      return;
    }

    nextDetectiveStoryStep();
  }
);

caseStage.addEventListener(
  'keydown',
  event=>{
    if(
      event.key==='Enter' ||
      event.key===' '
    ){
      event.preventDefault();
      nextDetectiveStoryStep();
    }
  }
);

caseStage.setAttribute(
  'tabindex',
  '0'
);

detectiveNextClue.addEventListener(
  'click',
  nextDetectiveStoryStep
);

document
  .getElementById(
    'newDetectiveCase'
  )
  .addEventListener(
    'click',
    loadDetectiveCase
  );

function normalizeAnswer(text){
  return String(text||'')
    .toLowerCase()
    .replace(/[’‘`]/g,"'")
    .replace(/\bwon['’]?t\b/g,'will not')
    .replace(/\bwouldn['’]?t\b/g,'would not')
    .replace(/\bshouldn['’]?t\b/g,'should not')
    .replace(/\bcouldn['’]?t\b/g,'could not')
    .replace(/\bdidn['’]?t\b/g,'did not')
    .replace(/\bdon['’]?t\b/g,'do not')
    .replace(/\bdoesn['’]?t\b/g,'does not')
    .replace(/\bcan['’]?t\b/g,'cannot')
    .replace(/\bisn['’]?t\b/g,'is not')
    .replace(/\baren['’]?t\b/g,'are not')
    .replace(/@/g,' at ')
    .replace(/[._/\\-]+/g,' ')
    .replace(/[^a-z0-9\s]/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}

/*
  Lightweight stemming makes answers such as:
  "verified", "verifying", "verification"
  or "suspicious", "suspicion"
  easier to recognise without requiring exact wording.
*/
function answerStem(word){
  let w=word.toLowerCase();

  const irregular={
    identities:'identity',
    credentials:'credential',
    messages:'message',
    addresses:'address',
    websites:'website',
    passwords:'password',
    links:'link',
    emails:'email'
  };

  if(irregular[w])return irregular[w];

  if(w.length>7&&w.endsWith('ation'))w=w.slice(0,-5);
  else if(w.length>6&&w.endsWith('ing'))w=w.slice(0,-3);
  else if(w.length>5&&w.endsWith('ied'))w=w.slice(0,-3)+'y';
  else if(w.length>5&&w.endsWith('ed'))w=w.slice(0,-2);
  else if(w.length>5&&w.endsWith('ly'))w=w.slice(0,-2);
  else if(w.length>5&&w.endsWith('es'))w=w.slice(0,-2);
  else if(w.length>4&&w.endsWith('s'))w=w.slice(0,-1);

  return w;
}

function editDistance(a,b){
  if(a===b)return 0;
  if(!a.length)return b.length;
  if(!b.length)return a.length;

  /*
    Two-row Levenshtein instead of a full matrix.
    It is quicker and uses less memory while typing/scanning.
  */
  let previous=Array.from(
    {length:b.length+1},
    (_,i)=>i
  );

  for(let i=1;i<=a.length;i++){
    const current=[i];

    for(let j=1;j<=b.length;j++){
      current[j]=Math.min(
        current[j-1]+1,
        previous[j]+1,
        previous[j-1]+(a[i-1]===b[j-1]?0:1)
      );
    }

    previous=current;
  }

  return previous[b.length];
}

function wordLooksLike(answerWord,targetWord){
  const a=answerStem(answerWord);
  const b=answerStem(targetWord);

  if(a===b)return true;

  if(
    a.length>=4 &&
    b.length>=4 &&
    (a.startsWith(b)||b.startsWith(a))
  ){
    return true;
  }

  const longest=Math.max(a.length,b.length);

  if(longest<4)return false;

  let allowance=0;

  if(longest>=4)allowance=1;
  if(longest>=7)allowance=2;
  if(longest>=11)allowance=3;

  return editDistance(a,b)<=allowance;
}

const scannerStopWords=new Set([
  'the','a','an','and','or','but','to','of','for','in','on','at',
  'it','is','was','were','be','been','being','this','that','they',
  'their','them','he','she','his','her','i','we','you','your',
  'because','since','so','very','really','something','thing'
]);

function usefulWords(text){
  return normalizeAnswer(text)
    .split(' ')
    .filter(
      word=>
        word.length>=3 &&
        !scannerStopWords.has(word)
    );
}

/*
  This is intentionally tolerant:
  - exact phrase -> accepted immediately
  - synonyms in the concept groups -> accepted
  - small spelling errors -> accepted
  - different word endings -> accepted
  - most important words in a longer phrase -> accepted
*/
function fuzzyPhraseMatch(answer,phrase){
  const a=normalizeAnswer(answer);
  const p=normalizeAnswer(phrase);

  if(!a||!p)return false;

  if(a.includes(p))return true;

  const answerWords=usefulWords(a);
  const phraseWords=usefulWords(p);

  if(!phraseWords.length)return false;

  let matches=0;

  for(const target of phraseWords){
    if(
      answerWords.some(
        word=>wordLooksLike(word,target)
      )
    ){
      matches++;
    }
  }

  /*
    Single important word: one match is enough.
    Two-word phrase: both should normally match.
    Longer phrases: about 60% of the meaningful words is enough,
    so natural rewording does not get unfairly rejected.
  */
  const required=
    phraseWords.length===1
      ?1
      :phraseWords.length===2
        ?2
        :Math.max(
            2,
            Math.ceil(phraseWords.length*.60)
          );

  return matches>=required;
}

function matchedConceptGroups(answer,groups){
  return groups
    .map(
      (group,index)=>({
        index,
        matched:
          group.some(
            phrase=>
              fuzzyPhraseMatch(
                answer,
                phrase
              )
          )
      })
    )
    .filter(item=>item.matched)
    .map(item=>item.index);
}

function countConceptMatches(answer,groups){
  return matchedConceptGroups(
    answer,
    groups
  ).length;
}

/*
  The new middle question asks the player to identify one clue
  that made them suspicious. Any genuine warning sign from the
  current case can be a correct answer; they do not have to choose
  one predetermined "best" clue.
*/
function scanDetective(){
  const c=
    detectiveCases[
      detectiveCaseIndex
    ];

  const signsAnswer=
    detectiveSigns.value.trim();

  const clueAnswer=
    detectiveKeyClue.value.trim();

  const preventionAnswer=
    detectivePrevention.value.trim();

  const signMatches=
    matchedConceptGroups(
      signsAnswer,
      c.concepts.signs
    );

  const clueMatches=
    matchedConceptGroups(
      clueAnswer,
      c.concepts.signs
    );

  const preventionMatches=
    matchedConceptGroups(
      preventionAnswer,
      c.concepts.prevention
    );

  const signCount=
    signMatches.length;

  const clueCount=
    clueMatches.length;

  const preventionCount=
    preventionMatches.length;

  /*
    Avoid rejecting a good explanation just because it uses a short
    natural phrase. For the key-clue answer, one real clue is enough.
  */
  const signsGood=
    signCount>=2;

  const clueGood=
    clueCount>=1;

  const preventionGood=
    preventionCount>=1;

  const solved=
    signsGood &&
    clueGood &&
    preventionGood;

  /*
    Score only the ideas relevant to the three actual questions.
  */
  const totalPossible=
    c.concepts.signs.length+
    1+
    c.concepts.prevention.length;

  const total=
    signCount+
    (clueGood?1:0)+
    preventionCount;

  detectiveScanResult.className=
    `scan-result ${
      solved
        ?'scan-success'
        :'scan-keep-looking'
    }`;

  detectiveScanResult.innerHTML=`
    <div class="scan-status">
      <b>${solved?'CASE SOLVED':'KEEP INVESTIGATING'}</b>
      <span>${total} / ${totalPossible} ideas recognized</span>
    </div>

    <div class="scan-lines">
      <span>
        ${signsGood?'✓':'○'}
        Warning signs recognized:
        ${signCount}/${c.concepts.signs.length}
      </span>

      <span>
        ${clueGood?'✓':'○'}
        Suspicious clue explained
      </span>

      <span>
        ${preventionGood?'✓':'○'}
        Safer actions recognized:
        ${preventionCount}/${c.concepts.prevention.length}
      </span>
    </div>

    <p>${
      solved
        ?'Your report identifies the warning signs, explains a suspicious clue, and gives a safer response.'
        :'Add a little more evidence from the case. Natural wording, synonyms, and small spelling mistakes are accepted — you do not need to copy exact phrases.'
    }</p>`;

  if(
    solved &&
    victorySound
  ){
    victorySound.pause();
    victorySound.currentTime=0;

    victorySound
      .play()
      .catch(()=>{});
  }
}

document
  .getElementById(
    'scanDetectiveAnswers'
  )
  .addEventListener(
    'click',
    scanDetective
  );

// =========================================================
// MINIGAME 2 — SCAM DODGE
// =========================================================

const dodgeCanvas=document.getElementById('dodgeCanvas');
const dctx=dodgeCanvas.getContext('2d');
const dodgeOverlay=document.getElementById('dodgeOverlay');
const dodgeLevelEl=document.getElementById('dodgeLevel');
const dodgeTimeEl=document.getElementById('dodgeTime');
const dodgeLivesEl=document.getElementById('dodgeLives');
const dodgeScoreEl=document.getElementById('dodgeScore');
let dodgeRAF=0,dodgeRunning=false,dodgeStart=0,dodgeLast=0,dodgeSpawn=0,dodgeLives=3,dodgeLevel=1,dodgeScore=0;
let dodgePlayer={x:382,y:420,w:36,h:42,speed:350};
let dodgeHazards=[];
const dodgeKeys={left:false,right:false};
const hazardTypes=['LINK','QR','PWD','GIFT','MAIL','POP'];

function resetDodgePreview(){
  stopDodgeGame();
  dodgeLives=3;dodgeLevel=1;dodgeScore=0;dodgeHazards=[];dodgePlayer.x=382;
  dodgeLevelEl.textContent='1';dodgeTimeEl.textContent='0';dodgeLivesEl.textContent='♥♥♥';dodgeScoreEl.textContent='0';
  dodgeOverlay.classList.remove('hidden-overlay');
  dodgeOverlay.querySelector('.overlay-card').innerHTML='<span class="mini-pixel-icon">◆</span><h3>Scam Dodge</h3><p>Move with ← → or A / D. Dodge phishing hazards. Every 10 seconds, the level increases.</p><button id="startDodgeInner" class="main-btn" type="button">Start game</button>';
  document.getElementById('startDodgeInner').addEventListener('click',startDodgeGame);
  drawDodgeScene(0);
}

function stopDodgeGame(){
  dodgeRunning=false;
  if(dodgeRAF)cancelAnimationFrame(dodgeRAF);
  dodgeRAF=0;
  dodgeKeys.left=false;dodgeKeys.right=false;
}

function startDodgeGame(){
  stopDodgeGame();
  dodgeRunning=true;dodgeStart=performance.now();dodgeLast=dodgeStart;dodgeSpawn=0;dodgeLives=3;dodgeLevel=1;dodgeScore=0;dodgeHazards=[];dodgePlayer.x=382;
  dodgeOverlay.classList.add('hidden-overlay');
  dodgeRAF=requestAnimationFrame(dodgeLoop);
}

document.getElementById('startDodge').addEventListener('click',startDodgeGame);

function spawnHazard(){
  const size=30+Math.random()*16;
  dodgeHazards.push({x:20+Math.random()*(dodgeCanvas.width-size-40),y:-size,w:size,h:size,type:hazardTypes[Math.floor(Math.random()*hazardTypes.length)],speed:120+dodgeLevel*30+Math.random()*70});
}

function hitRect(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y}

function dodgeLoop(now){
  if(!dodgeRunning)return;
  const dt=Math.min(.035,(now-dodgeLast)/1000);dodgeLast=now;
  const elapsed=(now-dodgeStart)/1000;
  dodgeLevel=Math.floor(elapsed/10)+1;
  dodgeLevelEl.textContent=String(dodgeLevel);
  dodgeTimeEl.textContent=String(Math.floor(elapsed));
  dodgeScore=Math.floor(elapsed*10);
  dodgeScoreEl.textContent=String(dodgeScore);
  if(dodgeKeys.left)dodgePlayer.x-=dodgePlayer.speed*dt;
  if(dodgeKeys.right)dodgePlayer.x+=dodgePlayer.speed*dt;
  dodgePlayer.x=Math.max(8,Math.min(dodgeCanvas.width-dodgePlayer.w-8,dodgePlayer.x));
  const interval=Math.max(260,920-dodgeLevel*80);
  if(now-dodgeSpawn>interval){spawnHazard();dodgeSpawn=now;}
  dodgeHazards.forEach(h=>h.y+=h.speed*dt);
  for(let i=dodgeHazards.length-1;i>=0;i--){
    const h=dodgeHazards[i];
    if(hitRect(dodgePlayer,h)){
      dodgeHazards.splice(i,1);dodgeLives--;dodgeLivesEl.textContent='♥'.repeat(Math.max(0,dodgeLives))+'♡'.repeat(Math.max(0,3-dodgeLives));
      if(dodgeLives<=0){endDodge(false,elapsed);return;}
    }else if(h.y>dodgeCanvas.height+60){dodgeHazards.splice(i,1);}
  }
  if(elapsed>=60){endDodge(true,elapsed);return;}
  drawDodgeScene(elapsed);
  dodgeRAF=requestAnimationFrame(dodgeLoop);
}

function drawPixelCharacter(ctx,x,y){
  ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.imageSmoothingEnabled=false;
  ctx.fillStyle='#d9c6ff';ctx.fillRect(10,0,16,8);ctx.fillRect(6,8,24,18);
  ctx.fillStyle='#120a1d';ctx.fillRect(10,14,4,4);ctx.fillRect(22,14,4,4);
  ctx.fillStyle='#8f5be0';ctx.fillRect(8,26,20,8);ctx.fillRect(3,30,7,5);ctx.fillRect(28,30,7,5);
  ctx.fillStyle='#f4eaff';ctx.fillRect(8,34,8,8);ctx.fillRect(20,34,8,8);
  ctx.restore();
}

function drawHazard(ctx,h){
  const x=Math.round(h.x),y=Math.round(h.y),s=Math.round(h.w);
  ctx.save();ctx.imageSmoothingEnabled=false;
  ctx.fillStyle='#ff5678';ctx.fillRect(x,y,s,s);
  ctx.fillStyle='#260817';ctx.fillRect(x+4,y+4,s-8,s-8);
  ctx.fillStyle='#ffb3c2';ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(h.type,x+s/2,y+s/2);
  ctx.restore();
}

function drawDodgeScene(elapsed){
  dctx.clearRect(0,0,dodgeCanvas.width,dodgeCanvas.height);
  const grd=dctx.createLinearGradient(0,0,0,dodgeCanvas.height);grd.addColorStop(0,'#10071f');grd.addColorStop(1,'#1a0d2c');dctx.fillStyle=grd;dctx.fillRect(0,0,dodgeCanvas.width,dodgeCanvas.height);
  dctx.strokeStyle='rgba(188,154,255,.08)';dctx.lineWidth=1;
  for(let x=0;x<dodgeCanvas.width;x+=32){dctx.beginPath();dctx.moveTo(x,0);dctx.lineTo(x,dodgeCanvas.height);dctx.stroke();}
  for(let y=0;y<dodgeCanvas.height;y+=32){dctx.beginPath();dctx.moveTo(0,y);dctx.lineTo(dodgeCanvas.width,y);dctx.stroke();}
  dctx.fillStyle='rgba(184,141,255,.12)';dctx.fillRect(0,448,dodgeCanvas.width,32);
  dodgeHazards.forEach(h=>drawHazard(dctx,h));
  drawPixelCharacter(dctx,dodgePlayer.x,dodgePlayer.y);
  if(elapsed>0&&Math.floor(elapsed)%10===0){dctx.fillStyle='rgba(225,207,255,.7)';dctx.font='bold 18px monospace';dctx.textAlign='center';dctx.fillText(`LEVEL ${dodgeLevel}`,dodgeCanvas.width/2,42);}
}

function endDodge(won,elapsed){
  stopDodgeGame();
  dodgeOverlay.classList.remove('hidden-overlay');
  const card=dodgeOverlay.querySelector('.overlay-card');
  card.innerHTML=`<span class="mini-pixel-icon">${won?'✦':'⚠'}</span><h3>${won?'CYBER SURVIVOR':'YOU GOT CAUGHT'}</h3><p>${won?'You survived the full scam storm.':'The scam storm got you this time.'}<br>Time: ${Math.floor(elapsed)}s · Level: ${dodgeLevel} · Score: ${dodgeScore}</p><button id="restartDodge" class="main-btn" type="button">Play again</button>`;
  document.getElementById('restartDodge').addEventListener('click',startDodgeGame);
  if(won&&victorySound){victorySound.pause();victorySound.currentTime=0;victorySound.play().catch(()=>{});}
}

function setDodgeKey(side,on){dodgeKeys[side]=on}
window.addEventListener('keydown',e=>{
  if(!dodgeRunning)return;
  if(e.key==='ArrowLeft'||e.key.toLowerCase()==='a'){e.preventDefault();dodgeKeys.left=true;}
  if(e.key==='ArrowRight'||e.key.toLowerCase()==='d'){e.preventDefault();dodgeKeys.right=true;}
});
window.addEventListener('keyup',e=>{
  if(e.key==='ArrowLeft'||e.key.toLowerCase()==='a')dodgeKeys.left=false;
  if(e.key==='ArrowRight'||e.key.toLowerCase()==='d')dodgeKeys.right=false;
});
[['dodgeLeft','left'],['dodgeRight','right']].forEach(([id,side])=>{
  const b=document.getElementById(id);
  ['pointerdown','pointerenter'].forEach(ev=>b.addEventListener(ev,e=>{if(ev==='pointerenter'&&e.buttons!==1)return;setDodgeKey(side,true);}));
  ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>setDodgeKey(side,false)));
});

// =========================================================
// MINIGAME 3 — LINK LABYRINTH
// =========================================================

const mazeCanvas=document.getElementById('mazeCanvas');
const mctx=mazeCanvas.getContext('2d');
const mazeOverlay=document.getElementById('mazeOverlay');
const mazeDoorLegend=document.getElementById('mazeDoorLegend');
const mazeLevelEl=document.getElementById('mazeLevel');
const mazeLivesEl=document.getElementById('mazeLives');
const mazeMessage=document.getElementById('mazeMessage');
const TILE=48;
let mazeActive=false,mazeLevel=0,mazeLives=3,mazePlayer={x:1,y:1};

const mazeLevels=[
  {
    map:[
      '#################',
      '#S....#.........#',
      '#.###.#.#####.#.#',
      '#...#.#.....#.#A#',
      '###.#.#####.#.#.#',
      '#...#.....#.#...#',
      '#.#######.#.###.#',
      '#.........#.....#',
      '#.#############.#',
      '#...............B#',
      '#################'
    ],
    doors:{A:{url:'accounts.google.com',safe:true},B:{url:'google-security-check.net',safe:false}}
  },
  {
    map:[
      '#################',
      '#S......#.......#',
      '#######.#.#####.#',
      '#.......#.....#A#',
      '#.###########.#.#',
      '#.............#.#',
      '#.###########.#.#',
      '#.#.........#...#',
      '#.#.#######.###.#',
      '#...............B#',
      '#################'
    ],
    doors:{A:{url:'micros0ft-login.com',safe:false},B:{url:'account.microsoft.com',safe:true}}
  },
  {
    map:[
      '#################',
      '#S....#.........#',
      '#.###.#.#######.#',
      '#...#.#.......#A#',
      '###.#.#######.#.#',
      '#...#.........#.#',
      '#.###########.#.#',
      '#...........#...#',
      '#.#########.###.#',
      '#...............B#',
      '#################'
    ],
    doors:{A:{url:'paypal.com',safe:true},B:{url:'paypa1-secure-login.net',safe:false}}
  }
];

function resetMazePreview(){
  mazeActive=false;mazeLevel=0;mazeLives=3;
  mazeLevelEl.textContent='1 / 3';mazeLivesEl.textContent='♥♥♥';mazeMessage.textContent='Choose the safer URL. A wrong gate costs one life.';
  mazeOverlay.classList.remove('hidden-overlay');
  mazeOverlay.querySelector('.overlay-card').innerHTML='<span class="mini-pixel-icon">▦</span><h3>Link Labyrinth</h3><p>Use the arrow keys or WASD to move through the 2D maze. At each exit, inspect the URL and walk into the safer gate.</p><button id="startMazeInner" class="main-btn" type="button">Enter maze</button>';
  document.getElementById('startMazeInner').addEventListener('click',startMazeGame);
  drawMazePreview();
}

document.getElementById('startMaze').addEventListener('click',startMazeGame);

function startMazeGame(){
  mazeActive=true;mazeLevel=0;mazeLives=3;
  mazeOverlay.classList.add('hidden-overlay');
  loadMazeLevel();
}

function loadMazeLevel(){
  const level=mazeLevels[mazeLevel];
  mazeLevelEl.textContent=`${mazeLevel+1} / ${mazeLevels.length}`;
  mazeLivesEl.textContent='♥'.repeat(mazeLives)+'♡'.repeat(3-mazeLives);
  mazeMessage.textContent='Inspect Door A and Door B, then navigate to the safer URL.';
  for(let y=0;y<level.map.length;y++)for(let x=0;x<level.map[y].length;x++)if(level.map[y][x]==='S')mazePlayer={x,y};
  mazeDoorLegend.innerHTML=Object.entries(level.doors).map(([key,d])=>`<div class="door-key"><span>DOOR ${key}</span><code>${d.url}</code></div>`).join('');
  drawMaze();
}

function drawMazePreview(){
  mctx.fillStyle='#0e0718';mctx.fillRect(0,0,mazeCanvas.width,mazeCanvas.height);
  mctx.fillStyle='rgba(178,137,255,.14)';
  for(let y=0;y<mazeCanvas.height;y+=TILE)for(let x=0;x<mazeCanvas.width;x+=TILE)if((x/TILE+y/TILE)%2===0)mctx.fillRect(x,y,TILE,TILE);
  mctx.fillStyle='#d9c7ff';mctx.font='bold 28px monospace';mctx.textAlign='center';mctx.fillText('LINK LABYRINTH',mazeCanvas.width/2,mazeCanvas.height/2);
}

function drawMaze(){
  const level=mazeLevels[mazeLevel];
  mctx.clearRect(0,0,mazeCanvas.width,mazeCanvas.height);
  mctx.fillStyle='#0b0612';mctx.fillRect(0,0,mazeCanvas.width,mazeCanvas.height);
  for(let y=0;y<level.map.length;y++){
    for(let x=0;x<level.map[y].length;x++){
      const cell=level.map[y][x],px=x*TILE,py=y*TILE;
      if(cell==='#'){
        mctx.fillStyle='#2b1840';mctx.fillRect(px,py,TILE,TILE);
        mctx.fillStyle='#4b2a6f';mctx.fillRect(px+4,py+4,TILE-8,TILE-8);
        mctx.fillStyle='#1c102a';mctx.fillRect(px+8,py+8,TILE-16,TILE-16);
      }else{
        mctx.fillStyle=((x+y)%2===0)?'#140a20':'#180d25';mctx.fillRect(px,py,TILE,TILE);
      }
      if(cell==='A'||cell==='B'){
        mctx.fillStyle='#7f4cc7';mctx.fillRect(px+6,py+6,TILE-12,TILE-12);
        mctx.strokeStyle='#e0ccff';mctx.lineWidth=3;mctx.strokeRect(px+7.5,py+7.5,TILE-15,TILE-15);
        mctx.fillStyle='#fff';mctx.font='bold 22px monospace';mctx.textAlign='center';mctx.textBaseline='middle';mctx.fillText(cell,px+TILE/2,py+TILE/2);
      }
    }
  }
  const px=mazePlayer.x*TILE,py=mazePlayer.y*TILE;
  mctx.fillStyle='#d7c1ff';mctx.fillRect(px+15,py+8,18,12);mctx.fillRect(px+11,py+20,26,18);
  mctx.fillStyle='#160922';mctx.fillRect(px+16,py+23,4,4);mctx.fillRect(px+28,py+23,4,4);
  mctx.fillStyle='#8f5be0';mctx.fillRect(px+8,py+38,13,7);mctx.fillRect(px+27,py+38,13,7);
}

function mazeCell(x,y){
  const level=mazeLevels[mazeLevel];
  if(y<0||y>=level.map.length||x<0||x>=level.map[0].length)return '#';
  return level.map[y][x];
}

function moveMaze(dx,dy){
  if(!mazeActive)return;
  const nx=mazePlayer.x+dx,ny=mazePlayer.y+dy,cell=mazeCell(nx,ny);
  if(cell==='#')return;
  mazePlayer={x:nx,y:ny};
  if(cell==='A'||cell==='B')handleMazeDoor(cell);
  drawMaze();
}

function handleMazeDoor(letter){
  const door=mazeLevels[mazeLevel].doors[letter];
  if(door.safe){
    mazeMessage.textContent=`✓ ${door.url} is the safer route. Checkpoint cleared.`;
    mazeLevel++;
    if(mazeLevel>=mazeLevels.length){
      mazeActive=false;
      mazeOverlay.classList.remove('hidden-overlay');
      mazeOverlay.querySelector('.overlay-card').innerHTML='<span class="mini-pixel-icon">✦</span><h3>MAZE CLEARED</h3><p>You followed the safer URLs through all three levels.</p><button id="restartMaze" class="main-btn" type="button">Play again</button>';
      document.getElementById('restartMaze').addEventListener('click',startMazeGame);
      if(victorySound){victorySound.pause();victorySound.currentTime=0;victorySound.play().catch(()=>{});}
    }else{
      setTimeout(()=>{if(mazeActive)loadMazeLevel();},550);
    }
  }else{
    mazeLives--;
    mazeLivesEl.textContent='♥'.repeat(Math.max(0,mazeLives))+'♡'.repeat(Math.max(0,3-mazeLives));
    mazeMessage.textContent=`✕ ${door.url} is suspicious. Look closely at the spelling and domain.`;
    if(mazeLives<=0){
      mazeActive=false;
      mazeOverlay.classList.remove('hidden-overlay');
      mazeOverlay.querySelector('.overlay-card').innerHTML='<span class="mini-pixel-icon">⚠</span><h3>TRAPPED BY A FAKE LINK</h3><p>Look carefully at spelling, domains, and unusual words before choosing a URL.</p><button id="restartMaze" class="main-btn" type="button">Try again</button>';
      document.getElementById('restartMaze').addEventListener('click',startMazeGame);
    }else{
      const level=mazeLevels[mazeLevel];
      for(let y=0;y<level.map.length;y++)for(let x=0;x<level.map[y].length;x++)if(level.map[y][x]==='S')mazePlayer={x,y};
      drawMaze();
    }
  }
}

window.addEventListener('keydown',e=>{
  if(!mazeActive)return;
  const k=e.key.toLowerCase();
  if(k==='arrowup'||k==='w'){e.preventDefault();moveMaze(0,-1);}
  if(k==='arrowdown'||k==='s'){e.preventDefault();moveMaze(0,1);}
  if(k==='arrowleft'||k==='a'){e.preventDefault();moveMaze(-1,0);}
  if(k==='arrowright'||k==='d'){e.preventDefault();moveMaze(1,0);}
});

document.querySelectorAll('[data-maze-move]').forEach(button=>button.addEventListener('click',()=>{
  const m=button.dataset.mazeMove;
  if(m==='up')moveMaze(0,-1);if(m==='down')moveMaze(0,1);if(m==='left')moveMaze(-1,0);if(m==='right')moveMaze(1,0);
}));
