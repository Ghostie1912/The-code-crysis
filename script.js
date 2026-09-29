const screens={splash:document.getElementById('splashScreen'),code:document.getElementById('codeScreen'),guideIntro:document.getElementById('guideIntroScreen'),guide:document.getElementById('guideScreen'),category:document.getElementById('categoryScreen'),game:document.getElementById('gameScreen'),result:document.getElementById('resultScreen'),minigames:document.getElementById('minigamesScreen'),detective:document.getElementById('detectiveScreen'),dodge:document.getElementById('dodgeScreen'),maze:document.getElementById('mazeScreen'),rescue:document.getElementById('rescueScreen'),firewall:document.getElementById('firewallScreen'),cyberchase:document.getElementById('cyberChaseScreen')};
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
const scenarios={"messages":[{"title":"The Private Screenshot","start":"main","steps":{"main":{"contact":"Friend","messages":[{"from":"them","text":"I sent you a screenshot of a private conversation. Can you send it in the group chat?"}],"choices":[{"text":"Send it. They already sent the screenshot to you.","result":"fail","explanation":"A private conversation should not be shared without permission."},{"text":"Don’t send it. Tell your friend it is private and should not be shared without permission.","result":"win","explanation":"Correct. Respect other people’s privacy and do not spread private messages or screenshots."},{"text":"Post it in the group but delete it later.","result":"fail","explanation":"Deleting it later does not undo the privacy violation once others have seen or saved it."}]}}},{"title":"The Suspicious Class Link","start":"main","steps":{"main":{"contact":"Classmate","messages":[{"from":"them","text":"Everyone in class says this link is safe. Open it!"},{"from":"them","text":"https://class-reward-login.example"}],"choices":[{"text":"Open it because everyone else says it is safe.","result":"fail","explanation":"A link is not automatically safe just because other people trust it."},{"text":"Don’t open it yet. Check the URL and verify it with a teacher or trusted source.","result":"win","explanation":"Exactly. Trust your instincts and verify suspicious links before opening them."},{"text":"Forward it to another friend and ask them to test it first.","result":"fail","explanation":"Do not put someone else at risk just to test a suspicious link."}]}}},{"title":"The Speeding Ticket Text","start":"main","steps":{"main":{"contact":"Ministry Alert","messages":[{"from":"them","text":"Traffic violation detected. You have a speeding ticket. Tap here to pay now."},{"from":"them","text":"traffic-payment-check.example"}],"choices":[{"text":"Open the link because the message says it is from the ministry.","result":"fail","explanation":"A sender name can be faked. Unexpected payment links should be verified independently."},{"text":"Show your parent and check the fine through the official government or traffic service.","result":"win","explanation":"Correct. Verify the fine through the official service instead of the text link."},{"text":"Enter your parent’s card details to see whether the ticket is real.","result":"fail","explanation":"Never enter payment information into an unverified link."}]}}},{"title":"The Expired Card Message","start":"main","steps":{"main":{"contact":"Bank Alert","messages":[{"from":"them","text":"Your bank card has expired. Tap the link below now to renew it."},{"from":"them","text":"card-renewal-secure.example"}],"choices":[{"text":"Tap the link and enter the card information.","result":"fail","explanation":"Banks should be contacted through official channels, not a random text link."},{"text":"Do not tap the link. Check the bank’s official app or contact the bank directly.","result":"win","explanation":"Correct. Verify card problems through an official banking channel."},{"text":"Reply with the card number and expiry date.","result":"fail","explanation":"Never send card details in a text message."}]}}},{"title":"The 2 A.M. Account Request","start":"main","steps":{"main":{"contact":"Friend","messages":[{"from":"them","text":"Hey, can you log into my account for me right now? I’ll send you the password."},{"from":"them","text":"Please hurry. I really need it done."}],"choices":[{"text":"Log in because the message came from your friend’s account.","result":"fail","explanation":"Their account may have been hacked. Unusual late-night requests should be verified."},{"text":"Contact your friend another way and confirm that they really sent the request.","result":"win","explanation":"Correct. Verify unusual account requests through another trusted method."},{"text":"Ask them to send more account information as proof.","result":"fail","explanation":"Do not ask for or handle extra passwords or private account information."}]}}},{"title":"The Overseas Prize Text","start":"main","steps":{"main":{"contact":"Unknown International Number","messages":[{"from":"them","text":"CONGRATULATIONS! You won a cash prize! Reply now to claim it."},{"from":"them","text":"Send your full name and bank details to receive your reward."}],"choices":[{"text":"Reply because winning a prize is worth checking.","result":"fail","explanation":"Unexpected prize messages from unknown numbers are a common scam tactic."},{"text":"Ignore, block, and report the message as spam or a scam.","result":"win","explanation":"Correct. Do not engage with unexpected prize messages from unknown numbers."},{"text":"Send only your name first and wait to see what happens.","result":"fail","explanation":"Even small pieces of personal information can be useful to scammers."}]}}}],"emails":[{"title":"The Urgent Teacher Email","from":"Your Teacher <teacher.school.help@gmail.com>","subject":"OPEN THIS NOW!","body":"Your teacher appears to be asking you to open something urgently, but the email address does not match the teacher’s real school email.","linkText":"OPEN FILE NOW","choices":[{"text":"Open it immediately because it says it is from your teacher.","result":"fail","explanation":"The sender address is an important clue. The message could be impersonation or phishing."},{"text":"Do not open it. Verify the message with your teacher through the school’s normal contact method.","result":"win","explanation":"Correct. Check the sender and verify unusual requests through a trusted school channel."},{"text":"Reply and ask the sender for your teacher’s password as proof.","result":"fail","explanation":"Never ask for or share passwords."}]},{"title":"The Gaming Receipt","from":"Game Billing <refund-center@game-billing.example>","subject":"Purchase receipt — payment completed","body":"This email says you bought a game you never purchased. A large button says you can get an immediate refund.","linkText":"GET A REFUND","choices":[{"text":"Press the refund button before you lose your money.","result":"fail","explanation":"Fake receipts often use panic to make people click phishing links."},{"text":"Check your purchase history through the official game store or account instead.","result":"win","explanation":"Correct. Verify the purchase through the official service before taking action."},{"text":"Reply with your card details so they can refund you.","result":"fail","explanation":"Never send card details by email."}]},{"title":"The Cancelled School Trip","from":"School Trips <school-trip-update@notice.example>","subject":"School trip cancelled — read immediately","body":"The email says your school trip was cancelled and asks you to click a strange link. Your school never announced a trip.","linkText":"VIEW TRIP INFORMATION","choices":[{"text":"Click the link because you need more information.","result":"fail","explanation":"A trip that was never announced plus a strange link are strong warning signs."},{"text":"Do not click. Ask your teacher or check the school’s official announcements.","result":"win","explanation":"Correct. Verify school information through official school channels."},{"text":"Forward the email to classmates and ask them to try the link.","result":"fail","explanation":"Do not spread suspicious links to other students."}]},{"title":"The Strange Gift Attachment","from":"Your Friend <friendmail@example.com>","subject":"SURPRISE GIFT FOR YOU!","body":"Your friend appears to have sent you a surprise gift, but the attachment has a strange name: Gift_Photo.scr","linkText":"OPEN ATTACHMENT","choices":[{"text":"Open the attachment because it came from a friend.","result":"fail","explanation":"A friend’s account can be compromised, and strange attachments should be treated carefully."},{"text":"Do not open it yet. Contact your friend another way and confirm they really sent it.","result":"win","explanation":"Correct. Verify unexpected attachments before opening them."},{"text":"Download it first and decide whether to open it later.","result":"fail","explanation":"Verify a suspicious file before downloading it."}]},{"title":"The Password Reset You Never Requested","from":"Account Security <password-reset@account-help.example>","subject":"Reset your password now","body":"We noticed you forgot your password. Click below to reset it immediately. You never requested a password reset.","linkText":"RESET PASSWORD","choices":[{"text":"Click the link just in case your password needs to be changed.","result":"fail","explanation":"An unexpected password-reset email may be phishing."},{"text":"Ignore the link and check the account directly through the official app or website.","result":"win","explanation":"Correct. Go directly to the real service and review your account security there."},{"text":"Reply with your current password and ask whether the email is real.","result":"fail","explanation":"Never send your password by email."}]},{"title":"The Free iPhone Bank Email","from":"BBK Bank <Bbkbank7894@gmail.com>","subject":"You just won a FREE iPhone! 🎉","body":"To receive your prize, enter your full name, home address, and credit card information through this link: bbdk658.com/search","linkText":"CLAIM THE FREE IPHONE","choices":[{"text":"Click the link to claim the free iPhone.","result":"fail","explanation":"The unexpected prize, Gmail sender address, suspicious URL, and request for card information are warning signs."},{"text":"Enter your information because the email looks official.","result":"fail","explanation":"A professional-looking message can still be fake."},{"text":"Do not use the link. Verify the message with BBK through an official channel.","result":"win","explanation":"Correct. Contact the bank through its official app, website, phone number, or branch."}]}],"applications":[{"title":"The Filter App Permissions","appName":"Glow Filter","developer":"New Photo Labs","icon":"✨","permissions":["Precise location","Contacts","Microphone"],"choices":[{"text":"Allow everything because a filter app needs access to work.","result":"fail","explanation":"A basic filter app usually does not need your contacts, precise location, and microphone."},{"text":"Question why it needs those permissions and deny anything unnecessary.","result":"win","explanation":"Correct. App permissions should match what the app actually needs."},{"text":"Allow the permissions now and worry about privacy later.","result":"fail","explanation":"Check permissions before giving an app access to private information."}]},{"title":"The Game Update Website","appName":"Galaxy Quest Update","developer":"Update source: random-game-update.example","icon":"🎮","permissions":["Install from browser","Files and downloads"],"choices":[{"text":"Download the update from the random website.","result":"fail","explanation":"Mobile game updates should normally come through the official app store."},{"text":"Close the website and check for the update in the official App Store or Play Store.","result":"win","explanation":"Correct. Use the official app store for game updates."},{"text":"Turn off phone security so the website can install it.","result":"fail","explanation":"Never disable security protections to install software from an unknown website."}]},{"title":"The App You Never Installed","appName":"Quick Cleaner Plus","developer":"Unknown developer","icon":"?","permissions":["Background access","Files and photos","Device information"],"choices":[{"text":"Open it and give it every permission to see what it does.","result":"fail","explanation":"An unknown app should be investigated before it gets more access."},{"text":"Check its developer, permissions, install history, and whether someone you trust installed it.","result":"win","explanation":"Correct. Investigate where an unknown app came from before trusting it."},{"text":"Ignore it because apps sometimes install themselves.","result":"fail","explanation":"Unexpected apps are worth checking."}]},{"title":"The Quiz That Wants Everything","appName":"Which Character Are You?","developer":"Fun Quiz Factory","icon":"❓","permissions":["Full name","Birthday","Phone number","Precise location"],"choices":[{"text":"Give all the information because the quiz cannot work without it.","result":"fail","explanation":"A simple entertainment quiz does not need all of that personal information."},{"text":"Avoid giving unnecessary personal information.","result":"win","explanation":"Correct. Share as little personal information as necessary."},{"text":"Use your real phone number but make up the rest.","result":"fail","explanation":"There is no good reason to give a random quiz app your phone number just to play."}]},{"title":"The Free Rare Skin","appName":"Rare Skin Generator","developer":"Free Rewards Studio","icon":"🎁","permissions":["Install another app","Open external download page"],"choices":[{"text":"Download the other app because the rare skin is free.","result":"fail","explanation":"Free-item offers that require extra downloads can lead to scams or harmful software."},{"text":"Do not install it. Check the reward through the game’s official store or website.","result":"win","explanation":"Correct. Verify giveaways and rewards through official game channels."},{"text":"Install it and delete it immediately after getting the skin.","result":"fail","explanation":"An unsafe app can cause harm before you delete it."}]}],"websites":[{"title":"The 90% Off Dream Bag","url":"designer-bag-clearance.example","heading":"YOUR DREAM BAG — 90% OFF TODAY!","text":"The website looks convincing, but the price is unbelievably low and the web address is unfamiliar.","buttonText":"BUY NOW","choices":[{"text":"Buy it quickly before the discount disappears.","result":"fail","explanation":"Huge discounts and urgency can be used to lure people onto fake shopping sites."},{"text":"Check the URL, seller reputation, reviews, contact details, and whether the brand links to this store.","result":"win","explanation":"Correct. Investigate the website before entering payment information."},{"text":"Enter your card details first and see whether the payment page looks real.","result":"fail","explanation":"Do not enter payment details until you have verified the website."}]},{"title":"The 10-Second Reward","url":"instant-special-reward.example","heading":"YOU WERE RANDOMLY SELECTED!","text":"You have only 10 seconds to claim your special reward before it disappears.","buttonText":"CLAIM NOW — 00:10","choices":[{"text":"Click immediately because the timer is about to finish.","result":"fail","explanation":"Countdowns are often used to pressure you into acting without thinking."},{"text":"Close the page. An unexpected reward with a countdown is suspicious.","result":"win","explanation":"Correct. Do not let urgency pressure you into clicking or sharing information."},{"text":"Refresh the page to get more time and then claim it.","result":"fail","explanation":"The problem is the suspicious offer itself, not the timer."}]},{"title":"The Two Almost-Identical Websites","url":"Search results: microsoft.com | micros0ft-login.example","heading":"Which result is the real one?","text":"Two search results look very similar, but one web address is slightly different.","buttonText":"CHOOSE A RESULT","choices":[{"text":"Choose whichever result appears first.","result":"fail","explanation":"The first result is not automatically the legitimate website."},{"text":"Check the exact domain spelling, strange extra words, and whether it matches the official address.","result":"win","explanation":"Correct. Small spelling changes and extra words can reveal a fake site."},{"text":"Choose the one with the most exciting title.","result":"fail","explanation":"Website titles can be copied. The actual domain matters more."}]},{"title":"The Strange Fan Page","url":"official-creator-fans-rewards.example","heading":"OFFICIAL FAN PAGE","text":"The page uses your favorite creator’s photos and logo, but the website address looks strange.","buttonText":"JOIN THE FAN CLUB","choices":[{"text":"Trust it because it uses the creator’s real photos.","result":"fail","explanation":"Scammers can copy logos and photos from real creators."},{"text":"Check the address and compare it with links from the creator’s verified accounts.","result":"win","explanation":"Correct. Use verified official accounts to confirm real websites."},{"text":"Enter your email first because that is not very private.","result":"fail","explanation":"Do not give information to a suspicious website before verifying it."}]},{"title":"The Free Movie Player","url":"watch-new-movies-free.example","heading":"WATCH THE NEW MOVIE FREE!","text":"The site keeps opening new tabs and asks you to download a “special player” before the movie can start.","buttonText":"DOWNLOAD SPECIAL PLAYER","choices":[{"text":"Download the player because the movie will not work without it.","result":"fail","explanation":"Unexpected downloads and repeated pop-ups are warning signs."},{"text":"Close the site and do not download anything from it.","result":"win","explanation":"Correct. Leave suspicious streaming sites that push unknown downloads or constant pop-ups."},{"text":"Keep closing the tabs until the download finally works.","result":"fail","explanation":"Repeated pop-ups are a reason to leave the site."}]}]};

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
    if(game==='rescue'){
      resetRescuePreview();
      showScreen('rescue');
    }
    if(game==='firewall'){
      resetFirewallPreview();
      showScreen('firewall');
    }
    if(game==='cyberchase'){
      resetCyberChase();
      showScreen('cyberchase');
    }
  });
});

function stopAllMinigames(){
  stopDodgeGame();
  mazeActive=false;
  stopRescueGame();
  stopFirewallGame();
  if(typeof stopCyberChase==='function')stopCyberChase();
  if(detectiveMysterySound){
    detectiveMysterySound.pause();
    detectiveMysterySound.currentTime=0;
  }
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
  },
  {
    id:'003',
    title:'The Mystery QR Code',
    brief:'A QR code promises free game credit, but the page behind it does not look right. Follow the evidence and work out what the student should have checked first.',
    nodes:[
      {id:'n1',x:55,y:45,w:230,title:'Lunch Break — New Poster',text:'A sticker near the school gate says: “FREE GAME CREDIT — scan to claim today!”'},
      {id:'n2',x:345,y:35,w:245,title:'The QR Destination',text:'The code opens free-coins-school-reward.net.'},
      {id:'n3',x:625,y:120,w:245,title:'The Login Request',text:'The page asks for a school email address and password before showing the reward.'},
      {id:'n4',x:345,y:235,w:245,title:'The Countdown',text:'“Only 2 minutes left! Claim before your reward disappears.”'},
      {id:'n5',x:70,y:330,w:245,title:'A Second Look',text:'The QR sticker is covering part of an older official school poster.'},
      {id:'n6',x:610,y:350,w:250,title:'Official Check',text:'A teacher confirms that the school is not running any free game-credit promotion.'}
    ],
    links:[['n1','n2'],['n2','n3'],['n3','n4'],['n1','n5'],['n5','n6'],['n2','n6'],['n4','n6']],
    concepts:{
      signs:[
        ['free game credit','free coins','free reward','too good to be true','unexpected reward','game credit'],
        ['strange url','suspicious url','fake url','weird website','unknown website','free-coins-school-reward','domain'],
        ['password','school password','login details','credentials','asks for password','school email'],
        ['countdown','2 minutes','timer','urgency','pressure','claim today','disappears'],
        ['sticker covering poster','qr sticker','covered poster','tampered poster','fake sticker']
      ],
      prevention:[
        ['do not scan','dont scan','avoid qr','ignore qr','do not open','dont open'],
        ['check url','inspect url','verify website','check domain','look at website address'],
        ['ask teacher','tell teacher','check with teacher','school staff','trusted adult','ask school'],
        ['official school website','official source','school portal','verify promotion','check official announcement'],
        ['do not enter password','dont enter password','never share password','keep password private','do not log in']
      ]
    }
  },
  {
    id:'004',
    title:'The Verification Code Trap',
    brief:'A message appears to come from a close friend asking for a six-digit verification code. Reconstruct the conversation and decide why the request is dangerous.',
    nodes:[
      {id:'n1',x:55,y:45,w:230,title:'9:37 PM — Friend Messages',text:'“Heyyy I need a tiny favor. I accidentally sent a code to your phone.”'},
      {id:'n2',x:345,y:35,w:245,title:'The Code Arrives',text:'A real account service sends: “Your verification code is 481203. Do not share this code.”'},
      {id:'n3',x:625,y:120,w:245,title:'The Request',text:'The friend says: “Send me the 6 digits ASAP or my account will lock.”'},
      {id:'n4',x:345,y:235,w:245,title:'Something Is Different',text:'The messages do not sound like the friend, and they refuse to answer a voice call.'},
      {id:'n5',x:70,y:330,w:245,title:'Independent Check',text:'The student contacts the friend through another app.'},
      {id:'n6',x:610,y:350,w:250,title:'What Really Happened',text:'The friend says their main account was hacked and they never asked for the code.'}
    ],
    links:[['n1','n2'],['n2','n3'],['n3','n4'],['n4','n5'],['n5','n6'],['n1','n4'],['n2','n6']],
    concepts:{
      signs:[
        ['verification code','six digit code','6 digit code','otp','one time password','security code'],
        ['do not share','never share','warning says not to share','code warning'],
        ['urgent','asap','hurry','account will lock','pressure','rush'],
        ['sounds different','writing style changed','not like friend','refused call','would not call','avoid voice call']
      ],
      prevention:[
        ['do not share code','dont share code','never share verification code','keep otp private','keep code private'],
        ['call friend','contact friend another way','another app','verify with friend','check directly','voice call'],
        ['ignore request','do not reply','dont reply','do not respond','dont respond'],
        ['report hacked account','tell friend account hacked','report account','secure account','change password'],
        ['trusted adult','tell parent','ask parent','ask teacher']
      ]
    }
  },
  {
    id:'005',
    title:'The Fake Wi-Fi Portal',
    brief:'A student connects to a familiar-looking school Wi-Fi network and gets an unusual login page. Examine the clues before deciding whether the network can be trusted.',
    nodes:[
      {id:'n1',x:55,y:45,w:230,title:'Before Class — New Network',text:'A Wi-Fi network appears called “School_Free_WiFi_5G”.'},
      {id:'n2',x:345,y:35,w:245,title:'The Login Page',text:'The browser opens school-wifi-verify.net and asks for a school email and password.'},
      {id:'n3',x:625,y:120,w:245,title:'Extra Request',text:'The page also asks the student to download a “Security Certificate” file.'},
      {id:'n4',x:345,y:235,w:245,title:'The Address Looks Wrong',text:'The site does not use the school’s normal website address or portal.'},
      {id:'n5',x:70,y:330,w:245,title:'Check With IT',text:'The student asks a school staff member which Wi-Fi network students should use.'},
      {id:'n6',x:610,y:350,w:250,title:'The Real Network',text:'IT confirms the official network has a different name and never asks students to download a file.'}
    ],
    links:[['n1','n2'],['n2','n3'],['n2','n4'],['n4','n5'],['n5','n6'],['n3','n6'],['n1','n6']],
    concepts:{
      signs:[
        ['strange wifi','unknown wifi','fake wifi','different network name','school_free_wifi','suspicious network'],
        ['strange url','wrong url','fake website','school-wifi-verify','not school website','domain'],
        ['asks for password','school password','login details','credentials','email and password'],
        ['download certificate','security certificate','download file','unexpected download','asks to install'],
        ['different from official network','wrong network name','not official wifi']
      ],
      prevention:[
        ['do not connect','dont connect','disconnect wifi','forget network','leave network'],
        ['do not enter password','dont enter password','keep password private','do not log in'],
        ['do not download','dont download','avoid file','do not install certificate','dont install'],
        ['ask it','school it','ask teacher','school staff','check with school','trusted staff'],
        ['use official network','verify network name','official wifi','check official wifi','school network']
      ]
    }
  }
];

const detectiveScreen=document.getElementById('detectiveScreen');
const detectiveMysterySound=document.getElementById('detectiveMysterySound');
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

  if(detectiveMysterySound){
    detectiveMysterySound.pause();
    detectiveMysterySound.currentTime=0;
    detectiveMysterySound.volume=.72;
    detectiveMysterySound.play().catch(()=>{});
  }

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
// RANDOM MAZE VERSION
// =========================================================

const mazeCanvas=document.getElementById('mazeCanvas');
const mctx=mazeCanvas.getContext('2d');
const mazeOverlay=document.getElementById('mazeOverlay');
const mazeDoorLegend=document.getElementById('mazeDoorLegend');
const mazeLevelEl=document.getElementById('mazeLevel');
const mazeLivesEl=document.getElementById('mazeLives');
const mazeMessage=document.getElementById('mazeMessage');

const TILE=48;
const MAZE_COLS=17;
const MAZE_ROWS=11;

let mazeActive=false;
let mazeLevel=0;
let mazeLives=3;
let mazePlayer={x:1,y:1};
let currentMaze=null;
let mazeUrlDeck=[];

/*
  Each round now uses a fresh phishing-vs-official URL pair.
  The safe URL can be Door A OR Door B, so memorizing the letter
  does not help.
*/
const mazeUrlPairs=[
  {
    safe:'accounts.google.com',
    fake:'google-security-check.net'
  },
  {
    safe:'account.microsoft.com',
    fake:'micros0ft-login.com'
  },
  {
    safe:'paypal.com',
    fake:'paypa1-secure-login.net'
  },
  {
    safe:'appleid.apple.com',
    fake:'apple-id-verify-now.com'
  },
  {
    safe:'instagram.com',
    fake:'instagram-security-alert.net'
  },
  {
    safe:'amazon.com',
    fake:'amaz0n-login-support.com'
  },
  {
    safe:'netflix.com',
    fake:'netflix-account-fix.net'
  },
  {
    safe:'discord.com',
    fake:'discord-free-nitro-login.com'
  },
  {
    safe:'github.com',
    fake:'github-security-check.net'
  }
];

function shuffleArray(items){
  const copy=[...items];

  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }

  return copy;
}

function resetMazeUrlDeck(){
  mazeUrlDeck=shuffleArray(mazeUrlPairs);
}

function nextMazeUrlPair(){
  if(!mazeUrlDeck.length){
    resetMazeUrlDeck();
  }

  return mazeUrlDeck.pop();
}

/*
  Perfect-maze generator using randomized depth-first search.

  Odd coordinates are maze "rooms".
  Walls between visited rooms are carved out.
  This creates a real winding maze instead of a few easy corridors.
*/
function generateMazeGrid(){
  const grid=Array.from(
    {length:MAZE_ROWS},
    ()=>Array(MAZE_COLS).fill('#')
  );

  const start={
    x:1+2*Math.floor(Math.random()*((MAZE_COLS-1)/2)),
    y:1+2*Math.floor(Math.random()*((MAZE_ROWS-1)/2))
  };

  const stack=[start];
  const visited=new Set([`${start.x},${start.y}`]);

  grid[start.y][start.x]='.';

  const dirs=[
    {dx:2,dy:0},
    {dx:-2,dy:0},
    {dx:0,dy:2},
    {dx:0,dy:-2}
  ];

  while(stack.length){
    const current=stack[stack.length-1];

    const choices=shuffleArray(dirs).filter(({dx,dy})=>{
      const nx=current.x+dx;
      const ny=current.y+dy;

      return (
        nx>0 &&
        nx<MAZE_COLS-1 &&
        ny>0 &&
        ny<MAZE_ROWS-1 &&
        !visited.has(`${nx},${ny}`)
      );
    });

    if(!choices.length){
      stack.pop();
      continue;
    }

    const move=choices[0];

    const nx=current.x+move.dx;
    const ny=current.y+move.dy;

    grid[
      current.y+move.dy/2
    ][
      current.x+move.dx/2
    ]='.';

    grid[ny][nx]='.';

    visited.add(`${nx},${ny}`);

    stack.push({
      x:nx,
      y:ny
    });
  }

  return grid;
}

function openNeighbors(grid,x,y){
  const dirs=[
    [1,0],
    [-1,0],
    [0,1],
    [0,-1]
  ];

  return dirs.filter(([dx,dy])=>{
    const nx=x+dx;
    const ny=y+dy;

    return (
      ny>=0 &&
      ny<grid.length &&
      nx>=0 &&
      nx<grid[0].length &&
      grid[ny][nx]!=='#'
    );
  });
}

function floorCells(grid){
  const cells=[];

  for(let y=1;y<grid.length-1;y++){
    for(let x=1;x<grid[0].length-1;x++){
      if(grid[y][x]!== '#'){
        cells.push({x,y});
      }
    }
  }

  return cells;
}

function bfsDistances(grid,start){
  const queue=[start];
  const distances=new Map([
    [`${start.x},${start.y}`,0]
  ]);

  for(let i=0;i<queue.length;i++){
    const cell=queue[i];
    const distance=
      distances.get(
        `${cell.x},${cell.y}`
      );

    const dirs=[
      [1,0],
      [-1,0],
      [0,1],
      [0,-1]
    ];

    for(const [dx,dy] of dirs){
      const nx=cell.x+dx;
      const ny=cell.y+dy;
      const key=`${nx},${ny}`;

      if(
        ny<0 ||
        ny>=grid.length ||
        nx<0 ||
        nx>=grid[0].length ||
        grid[ny][nx]==='#' ||
        distances.has(key)
      ){
        continue;
      }

      distances.set(
        key,
        distance+1
      );

      queue.push({
        x:nx,
        y:ny
      });
    }
  }

  return distances;
}

function distanceBetween(grid,a,b){
  const distances=
    bfsDistances(grid,a);

  return (
    distances.get(
      `${b.x},${b.y}`
    ) ?? -1
  );
}

function manhattan(a,b){
  return (
    Math.abs(a.x-b.x)+
    Math.abs(a.y-b.y)
  );
}

/*
  Pick three genuinely separated dead ends:
  - start
  - Door A
  - Door B

  We score candidates using actual maze-path distance, not only
  screen position. This prevents A and B from sitting beside each other.
*/
function chooseMazeEndpoints(grid){
  const all=floorCells(grid);

  let deadEnds=
    all.filter(
      cell=>
        openNeighbors(
          grid,
          cell.x,
          cell.y
        ).length===1
    );

  /*
    Some randomized mazes can have fewer dead ends than desired.
    Fall back to all floor cells while still enforcing distance.
  */
  if(deadEnds.length<3){
    deadEnds=all;
  }

  let best=null;

  for(let attempt=0;attempt<90;attempt++){
    const start=
      deadEnds[
        Math.floor(
          Math.random()*
          deadEnds.length
        )
      ];

    const fromStart=
      bfsDistances(
        grid,
        start
      );

    const doorCandidates=
      deadEnds.filter(cell=>{
        const d=
          fromStart.get(
            `${cell.x},${cell.y}`
          ) ?? 0;

        return (
          !(cell.x===start.x&&cell.y===start.y) &&
          d>=12
        );
      });

    if(doorCandidates.length<2){
      continue;
    }

    /*
      Door A: one of the furthest points from the player.
    */
    doorCandidates.sort(
      (a,b)=>
        (
          fromStart.get(`${b.x},${b.y}`) ?? 0
        )-
        (
          fromStart.get(`${a.x},${a.y}`) ?? 0
        )
    );

    const topBand=
      doorCandidates.slice(
        0,
        Math.min(
          5,
          doorCandidates.length
        )
      );

    const doorA=
      topBand[
        Math.floor(
          Math.random()*
          topBand.length
        )
      ];

    const doorBChoices=
      doorCandidates
        .filter(cell=>{
          if(
            cell.x===doorA.x &&
            cell.y===doorA.y
          ){
            return false;
          }

          const between=
            distanceBetween(
              grid,
              doorA,
              cell
            );

          /*
            Both actual route distance AND physical distance must be
            substantial. So the two answer gates cannot look adjacent.
          */
          return (
            between>=14 &&
            manhattan(
              doorA,
              cell
            )>=7
          );
        })
        .sort(
          (a,b)=>
            distanceBetween(
              grid,
              doorA,
              b
            )-
            distanceBetween(
              grid,
              doorA,
              a
            )
        );

    if(!doorBChoices.length){
      continue;
    }

    const doorB=
      doorBChoices[
        Math.floor(
          Math.random()*
          Math.min(
            4,
            doorBChoices.length
          )
        )
      ];

    const score=
      (
        fromStart.get(
          `${doorA.x},${doorA.y}`
        ) ?? 0
      )+
      (
        fromStart.get(
          `${doorB.x},${doorB.y}`
        ) ?? 0
      )+
      distanceBetween(
        grid,
        doorA,
        doorB
      );

    if(!best||score>best.score){
      best={
        start,
        doorA,
        doorB,
        score
      };
    }
  }

  /*
    Very unlikely fallback: use a graph-diameter style selection.
  */
  if(!best){
    const seed=
      all[
        Math.floor(
          Math.random()*
          all.length
        )
      ];

    const seedDistances=
      bfsDistances(
        grid,
        seed
      );

    const start=
      [...all].sort(
        (a,b)=>
          (
            seedDistances.get(
              `${b.x},${b.y}`
            ) ?? 0
          )-
          (
            seedDistances.get(
              `${a.x},${a.y}`
            ) ?? 0
          )
      )[0];

    const startDistances=
      bfsDistances(
        grid,
        start
      );

    const doorA=
      [...all].sort(
        (a,b)=>
          (
            startDistances.get(
              `${b.x},${b.y}`
            ) ?? 0
          )-
          (
            startDistances.get(
              `${a.x},${a.y}`
            ) ?? 0
          )
      )[0];

    const doorADistances=
      bfsDistances(
        grid,
        doorA
      );

    const doorB=
      [...all]
        .filter(
          cell=>
            !(cell.x===start.x&&cell.y===start.y) &&
            !(cell.x===doorA.x&&cell.y===doorA.y)
        )
        .sort(
          (a,b)=>
            (
              doorADistances.get(
                `${b.x},${b.y}`
              ) ?? 0
            )-
            (
              doorADistances.get(
                `${a.x},${a.y}`
              ) ?? 0
            )
        )[0];

    best={
      start,
      doorA,
      doorB
    };
  }

  return best;
}

function createRandomMazeLevel(){
  /*
    Regenerate if the endpoint selector somehow produces gates that
    are too close. Usually the first maze already passes.
  */
  let grid;
  let endpoints;

  for(let tries=0;tries<25;tries++){
    grid=generateMazeGrid();
    endpoints=chooseMazeEndpoints(grid);

    if(
      endpoints &&
      distanceBetween(
        grid,
        endpoints.doorA,
        endpoints.doorB
      )>=14 &&
      manhattan(
        endpoints.doorA,
        endpoints.doorB
      )>=7
    ){
      break;
    }
  }

  const pair=
    nextMazeUrlPair();

  const safeIsA=
    Math.random()<.5;

  const doors={
    A:{
      url:
        safeIsA
          ?pair.safe
          :pair.fake,
      safe:safeIsA
    },
    B:{
      url:
        safeIsA
          ?pair.fake
          :pair.safe,
      safe:!safeIsA
    }
  };

  grid[
    endpoints.start.y
  ][
    endpoints.start.x
  ]='S';

  grid[
    endpoints.doorA.y
  ][
    endpoints.doorA.x
  ]='A';

  grid[
    endpoints.doorB.y
  ][
    endpoints.doorB.x
  ]='B';

  return {
    map:
      grid.map(
        row=>row.join('')
      ),
    doors,
    start:{
      ...endpoints.start
    }
  };
}

function resetMazePreview(){
  mazeActive=false;
  mazeLevel=0;
  mazeLives=3;
  currentMaze=null;

  mazeLevelEl.textContent='1 / 3';
  mazeLivesEl.textContent='♥♥♥';

  mazeMessage.textContent=
    'Choose the safer URL. Every maze is newly generated.';

  mazeOverlay.classList.remove(
    'hidden-overlay'
  );

  mazeOverlay
    .querySelector(
      '.overlay-card'
    )
    .innerHTML=
      '<span class="mini-pixel-icon">▦</span><h3>Link Labyrinth</h3><p>Every round creates a new maze. Use the arrow keys or WASD, explore the paths, and reach the safer URL gate. Door A and Door B are deliberately far apart.</p><button id="startMazeInner" class="main-btn" type="button">Enter maze</button>';

  document
    .getElementById(
      'startMazeInner'
    )
    .addEventListener(
      'click',
      startMazeGame
    );

  drawMazePreview();
}

document
  .getElementById(
    'startMaze'
  )
  .addEventListener(
    'click',
    startMazeGame
  );

function startMazeGame(){
  mazeActive=true;
  mazeLevel=0;
  mazeLives=3;
  currentMaze=null;

  resetMazeUrlDeck();

  mazeOverlay.classList.add(
    'hidden-overlay'
  );

  loadMazeLevel();
}

function loadMazeLevel(){
  /*
    NEW MAZE EVERY LEVEL.
    Replaying the game also starts with a completely new deck/layout.
  */
  currentMaze=
    createRandomMazeLevel();

  mazeLevelEl.textContent=
    `${mazeLevel+1} / 3`;

  mazeLivesEl.textContent=
    '♥'.repeat(mazeLives)+
    '♡'.repeat(3-mazeLives);

  mazeMessage.textContent=
    'Explore the maze and choose the safer URL. The gates are on different branches.';

  mazePlayer={
    ...currentMaze.start
  };

  mazeDoorLegend.innerHTML=
    Object.entries(
      currentMaze.doors
    )
    .map(
      ([key,d])=>
        `<div class="door-key"><span>DOOR ${key}</span><code>${d.url}</code></div>`
    )
    .join('');

  drawMaze();
}

function drawMazePreview(){
  mctx.fillStyle='#0e0718';
  mctx.fillRect(
    0,
    0,
    mazeCanvas.width,
    mazeCanvas.height
  );

  mctx.fillStyle=
    'rgba(178,137,255,.14)';

  for(
    let y=0;
    y<mazeCanvas.height;
    y+=TILE
  ){
    for(
      let x=0;
      x<mazeCanvas.width;
      x+=TILE
    ){
      if(
        (x/TILE+y/TILE)%2===0
      ){
        mctx.fillRect(
          x,
          y,
          TILE,
          TILE
        );
      }
    }
  }

  mctx.fillStyle='#d9c7ff';
  mctx.font='bold 28px monospace';
  mctx.textAlign='center';

  mctx.fillText(
    'LINK LABYRINTH',
    mazeCanvas.width/2,
    mazeCanvas.height/2
  );
}

function drawMaze(){
  if(!currentMaze)return;

  const level=currentMaze;

  mctx.clearRect(
    0,
    0,
    mazeCanvas.width,
    mazeCanvas.height
  );

  mctx.fillStyle='#0b0612';

  mctx.fillRect(
    0,
    0,
    mazeCanvas.width,
    mazeCanvas.height
  );

  for(
    let y=0;
    y<level.map.length;
    y++
  ){
    for(
      let x=0;
      x<level.map[y].length;
      x++
    ){
      const cell=
        level.map[y][x];

      const px=x*TILE;
      const py=y*TILE;

      if(cell==='#'){
        mctx.fillStyle='#2b1840';

        mctx.fillRect(
          px,
          py,
          TILE,
          TILE
        );

        mctx.fillStyle='#4b2a6f';

        mctx.fillRect(
          px+4,
          py+4,
          TILE-8,
          TILE-8
        );

        mctx.fillStyle='#1c102a';

        mctx.fillRect(
          px+8,
          py+8,
          TILE-16,
          TILE-16
        );
      }else{
        mctx.fillStyle=
          ((x+y)%2===0)
            ?'#140a20'
            :'#180d25';

        mctx.fillRect(
          px,
          py,
          TILE,
          TILE
        );
      }

      if(
        cell==='A' ||
        cell==='B'
      ){
        mctx.fillStyle='#7f4cc7';

        mctx.fillRect(
          px+6,
          py+6,
          TILE-12,
          TILE-12
        );

        mctx.strokeStyle='#e0ccff';
        mctx.lineWidth=3;

        mctx.strokeRect(
          px+7.5,
          py+7.5,
          TILE-15,
          TILE-15
        );

        mctx.fillStyle='#fff';
        mctx.font='bold 22px monospace';
        mctx.textAlign='center';
        mctx.textBaseline='middle';

        mctx.fillText(
          cell,
          px+TILE/2,
          py+TILE/2
        );
      }
    }
  }

  const px=
    mazePlayer.x*TILE;

  const py=
    mazePlayer.y*TILE;

  mctx.fillStyle='#d7c1ff';

  mctx.fillRect(
    px+15,
    py+8,
    18,
    12
  );

  mctx.fillRect(
    px+11,
    py+20,
    26,
    18
  );

  mctx.fillStyle='#160922';

  mctx.fillRect(
    px+16,
    py+23,
    4,
    4
  );

  mctx.fillRect(
    px+28,
    py+23,
    4,
    4
  );

  mctx.fillStyle='#8f5be0';

  mctx.fillRect(
    px+8,
    py+38,
    13,
    7
  );

  mctx.fillRect(
    px+27,
    py+38,
    13,
    7
  );
}

function mazeCell(x,y){
  if(!currentMaze)return '#';

  if(
    y<0 ||
    y>=currentMaze.map.length ||
    x<0 ||
    x>=currentMaze.map[0].length
  ){
    return '#';
  }

  return currentMaze.map[y][x];
}

function moveMaze(dx,dy){
  if(!mazeActive)return;

  const nx=
    mazePlayer.x+dx;

  const ny=
    mazePlayer.y+dy;

  const cell=
    mazeCell(
      nx,
      ny
    );

  if(cell==='#'){
    return;
  }

  mazePlayer={
    x:nx,
    y:ny
  };

  if(
    cell==='A' ||
    cell==='B'
  ){
    handleMazeDoor(cell);
  }

  drawMaze();
}

function handleMazeDoor(letter){
  if(!currentMaze)return;

  const door=
    currentMaze.doors[
      letter
    ];

  if(door.safe){
    mazeMessage.textContent=
      `✓ ${door.url} is the safer route. Checkpoint cleared.`;

    mazeLevel++;

    if(mazeLevel>=3){
      mazeActive=false;

      mazeOverlay.classList.remove(
        'hidden-overlay'
      );

      mazeOverlay
        .querySelector(
          '.overlay-card'
        )
        .innerHTML=
          '<span class="mini-pixel-icon">✦</span><h3>MAZE CLEARED</h3><p>You followed the safer URLs through three different randomized mazes.</p><button id="restartMaze" class="main-btn" type="button">Play again</button>';

      document
        .getElementById(
          'restartMaze'
        )
        .addEventListener(
          'click',
          startMazeGame
        );

      if(victorySound){
        victorySound.pause();
        victorySound.currentTime=0;

        victorySound
          .play()
          .catch(()=>{});
      }
    }else{
      setTimeout(
        ()=>{
          if(mazeActive){
            loadMazeLevel();
          }
        },
        550
      );
    }
  }else{
    mazeLives--;

    mazeLivesEl.textContent=
      '♥'.repeat(
        Math.max(
          0,
          mazeLives
        )
      )+
      '♡'.repeat(
        Math.max(
          0,
          3-mazeLives
        )
      );

    mazeMessage.textContent=
      `✕ ${door.url} is suspicious. Look closely at the spelling and domain.`;

    if(mazeLives<=0){
      mazeActive=false;

      mazeOverlay.classList.remove(
        'hidden-overlay'
      );

      mazeOverlay
        .querySelector(
          '.overlay-card'
        )
        .innerHTML=
          '<span class="mini-pixel-icon">⚠</span><h3>TRAPPED BY A FAKE LINK</h3><p>Look carefully at spelling, domains, and unusual words before choosing a URL.</p><button id="restartMaze" class="main-btn" type="button">Try again</button>';

      document
        .getElementById(
          'restartMaze'
        )
        .addEventListener(
          'click',
          startMazeGame
        );
    }else{
      /*
        Wrong gate: return to the same maze start.
        The maze does NOT reroll until the next level,
        so the player can learn from the mistake.
      */
      mazePlayer={
        ...currentMaze.start
      };

      drawMaze();
    }
  }
}

window.addEventListener(
  'keydown',
  e=>{
    if(!mazeActive)return;

    const k=
      e.key.toLowerCase();

    if(
      k==='arrowup' ||
      k==='w'
    ){
      e.preventDefault();
      moveMaze(0,-1);
    }

    if(
      k==='arrowdown' ||
      k==='s'
    ){
      e.preventDefault();
      moveMaze(0,1);
    }

    if(
      k==='arrowleft' ||
      k==='a'
    ){
      e.preventDefault();
      moveMaze(-1,0);
    }

    if(
      k==='arrowright' ||
      k==='d'
    ){
      e.preventDefault();
      moveMaze(1,0);
    }
  }
);

document
  .querySelectorAll(
    '[data-maze-move]'
  )
  .forEach(
    button=>
      button.addEventListener(
        'click',
        ()=>{
          const m=
            button.dataset.mazeMove;

          if(m==='up'){
            moveMaze(0,-1);
          }

          if(m==='down'){
            moveMaze(0,1);
          }

          if(m==='left'){
            moveMaze(-1,0);
          }

          if(m==='right'){
            moveMaze(1,0);
          }
        }
      )
  );




// =========================================================
// MINIGAME 4 — DATA RESCUE
// Compact full-screen phone mission with timed securing
// =========================================================

const rescueCanvas=document.getElementById('rescueCanvas');
const rctx=rescueCanvas.getContext('2d');
const rescueOverlay=document.getElementById('rescueOverlay');
const rescueSecuredEl=document.getElementById('rescueSecured');
const rescueAlertEl=document.getElementById('rescueAlert');
const rescueStatusEl=document.getElementById('rescueStatus');
const rescueMessage=document.getElementById('rescueMessage');
const rescueObjectiveTitle=document.getElementById('rescueObjectiveTitle');
const rescueObjectiveText=document.getElementById('rescueObjectiveText');
const rescueActionButton=document.getElementById('rescueActionButton');

const RESCUE_COLS=18;
const RESCUE_ROWS=11;
const RESCUE_TIME_LIMIT=75;
const RESCUE_SECURE_TIME=3000;
const RESCUE_LOCKOUT_TIME=5000;

let rescueActive=false;
let rescueLoopId=null;
let rescueEnemyTimer=null;
let rescueTimerId=null;
let rescuePlayer={x:1,y:9};
let rescueScammer={x:16,y:1};

/* Visual positions ease toward the logical grid positions,
   so movement looks smooth instead of snapping tile-to-tile. */
let rescuePlayerVisual={x:1,y:9};
let rescueScammerVisual={x:16,y:1};

let rescuePopAppId=null;
let rescuePopStartedAt=0;

let rescueItems=[];
let rescueSecured=0;
let rescueAlert=0;
let rescueExitActive=false;
let rescueMap=[];
let rescueFrame=0;
let rescueTimeLeft=RESCUE_TIME_LIMIT;
let rescueHolding=false;
let rescueHoldStartedAt=0;
let rescueHoldTarget=null;
let rescueLastTimestamp=0;

const rescueDataTypes=[
  {name:'PASSWORD',icon:'PW'},
  {name:'BANK INFO',icon:'$'},
  {name:'ID PHOTO',icon:'ID'},
  {name:'MESSAGES',icon:'MSG'}
];

/*
  Tighter 4 x 3 app grid. The icons are close enough to feel like one
  phone screen instead of separate islands.
*/
const rescueApps=[
  {id:'messages',label:'Messages',icon:'💬',color:'#56d97b',x:2,y:1,w:2,h:2},
  {id:'photos',label:'Photos',icon:'🖼',color:'#ffce55',x:6,y:1,w:2,h:2},
  {id:'bank',label:'Bank',icon:'🏦',color:'#65cfff',x:10,y:1,w:2,h:2},
  {id:'mail',label:'Mail',icon:'✉',color:'#6c9cff',x:14,y:1,w:2,h:2},

  {id:'passwords',label:'Passwords',icon:'🔑',color:'#9d85ff',x:2,y:4,w:2,h:2},
  {id:'files',label:'Files',icon:'📁',color:'#ffb45c',x:6,y:4,w:2,h:2},
  {id:'gallery',label:'Gallery',icon:'✨',color:'#ef86da',x:10,y:4,w:2,h:2},
  {id:'wallet',label:'Wallet',icon:'💳',color:'#3ed29c',x:14,y:4,w:2,h:2},

  {id:'contacts',label:'Contacts',icon:'👥',color:'#57d3c8',x:2,y:7,w:2,h:2},
  {id:'cloud',label:'Cloud',icon:'☁',color:'#9ec9ff',x:6,y:7,w:2,h:2},
  {id:'security',label:'Security',icon:'🛡',color:'#ff7aa5',x:10,y:7,w:2,h:2},
  {id:'settings',label:'Settings',icon:'⚙',color:'#b6bdc9',x:14,y:7,w:2,h:2,exit:true}
];

function rescueCellKey(cell){return `${cell.x},${cell.y}`;}
function rescueShuffle(list){
  const copy=[...list];
  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}
function rescueManhattan(a,b){return Math.abs(a.x-b.x)+Math.abs(a.y-b.y);}

function buildRescueMap(){
  const grid=Array.from({length:RESCUE_ROWS},()=>Array(RESCUE_COLS).fill('.'));
  for(let x=0;x<RESCUE_COLS;x++){
    grid[0][x]='#';
    grid[RESCUE_ROWS-1][x]='#';
  }
  for(let y=0;y<RESCUE_ROWS;y++){
    grid[y][0]='#';
    grid[y][RESCUE_COLS-1]='#';
  }
  rescueApps.forEach(app=>{
    for(let y=app.y;y<app.y+app.h;y++){
      for(let x=app.x;x<app.x+app.w;x++)grid[y][x]='#';
    }
  });
  return grid;
}

function appTerminal(app){return {x:app.x+Math.floor(app.w/2),y:app.y+app.h};}
function rescueFloorCells(){
  const cells=[];
  for(let y=1;y<RESCUE_ROWS-1;y++){
    for(let x=1;x<RESCUE_COLS-1;x++)if(rescueMap[y][x]!== '#')cells.push({x,y});
  }
  return cells;
}
function rescueIsWalkable(x,y){return y>=0&&y<RESCUE_ROWS&&x>=0&&x<RESCUE_COLS&&rescueMap[y][x]!== '#';}
function rescueNeighbors(cell){
  return [
    {x:cell.x+1,y:cell.y},{x:cell.x-1,y:cell.y},
    {x:cell.x,y:cell.y+1},{x:cell.x,y:cell.y-1}
  ].filter(c=>rescueIsWalkable(c.x,c.y));
}

function rescueBfsPath(start,target){
  const queue=[start];
  const cameFrom=new Map();
  const startKey=rescueCellKey(start);
  cameFrom.set(startKey,null);
  for(let i=0;i<queue.length;i++){
    const current=queue[i];
    if(current.x===target.x&&current.y===target.y){
      const path=[];
      let key=rescueCellKey(current);
      while(key!==startKey){
        const [x,y]=key.split(',').map(Number);
        path.push({x,y});
        key=cameFrom.get(key);
      }
      path.reverse();
      return path;
    }
    for(const next of rescueNeighbors(current)){
      const key=rescueCellKey(next);
      if(cameFrom.has(key))continue;
      cameFrom.set(key,rescueCellKey(current));
      queue.push(next);
    }
  }
  return [];
}

function rescueLineOfSight(a,b){
  if(a.x===b.x){
    for(let y=Math.min(a.y,b.y)+1;y<Math.max(a.y,b.y);y++)if(rescueMap[y][a.x]==='#')return false;
    return true;
  }
  if(a.y===b.y){
    for(let x=Math.min(a.x,b.x)+1;x<Math.max(a.x,b.x);x++)if(rescueMap[a.y][x]==='#')return false;
    return true;
  }
  return false;
}

function rescueRandomSpawn(floorCells,avoid=[],minDistance=0){
  const candidates=floorCells.filter(cell=>avoid.every(other=>rescueManhattan(cell,other)>=minDistance));
  const pool=candidates.length?candidates:floorCells;
  return pool[Math.floor(Math.random()*pool.length)];
}

function rescueLayout(){
  const W=rescueCanvas.width;
  const H=rescueCanvas.height;
  /* compact board: larger icons, smaller empty gaps */
  const tile=Math.min((W*0.82)/RESCUE_COLS,(H*0.88)/RESCUE_ROWS);
  const boardW=tile*RESCUE_COLS;
  const boardH=tile*RESCUE_ROWS;
  const offsetX=(W-boardW)/2;
  const offsetY=(H-boardH)/2+H*0.008;
  return {W,H,tile,boardW,boardH,offsetX,offsetY};
}

function rescueCellCenter(x,y){
  const L=rescueLayout();
  return {...L,x:L.offsetX+x*L.tile+L.tile/2,y:L.offsetY+y*L.tile+L.tile/2};
}

function rescueAppRect(app){
  const L=rescueLayout();
  return {...L,x:L.offsetX+app.x*L.tile,y:L.offsetY+app.y*L.tile,w:app.w*L.tile,h:app.h*L.tile};
}

function formatRescueTime(seconds){
  const s=Math.max(0,Math.ceil(seconds));
  return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
}

function updateRescueTimerUI(){
  rescueStatusEl.textContent=formatRescueTime(rescueTimeLeft);
}

function resetRescuePreview(){
  stopRescueGame();
  rescueMap=buildRescueMap();
  rescueSecured=0;
  rescueAlert=0;
  rescueExitActive=false;
  rescueItems=[];
  rescueTimeLeft=RESCUE_TIME_LIMIT;
  rescueHolding=false;
  rescueHoldTarget=null;

  rescueSecuredEl.textContent='0 / 4';
  rescueAlertEl.textContent='LOW';
  updateRescueTimerUI();
  rescueActionButton.classList.remove('action-ready','action-holding');
  rescueActionButton.textContent='HOLD TO SECURE';

  rescueObjectiveTitle.textContent='Mission: stop the breach';
  rescueObjectiveText.textContent='Secure 4 compromised apps before 01:15, then lock the scammer out in Settings.';
  rescueMessage.textContent='Find the four glowing compromised apps.';

  rescueOverlay.classList.remove('hidden-overlay');
  rescueOverlay.querySelector('.overlay-card').innerHTML=`
    <span class="mini-pixel-icon">▣</span>
    <h3>Data Rescue</h3>
    <p>
      <b>MISSION:</b> Secure 4 compromised apps before the 75-second timer ends.
      Stand at a glowing app and <b>hold E or Space for 3 seconds</b> while the scammer keeps moving.
      Then reach <b>Settings</b> and hold for 5 seconds to lock them out.
    </p>
    <p class="rescue-controls-note">Move: arrows / WASD &nbsp; • &nbsp; Secure: hold E / Space</p>
    <button id="startRescueInner" class="main-btn" type="button">Start mission</button>
  `;
  document.getElementById('startRescueInner').addEventListener('click',startRescueGame);
  drawRescuePreview();
}

function startRescueGame(){
  stopRescueGame();
  rescueMap=buildRescueMap();
  rescueActive=true;
  rescueSecured=0;
  rescueAlert=0;
  rescueExitActive=false;
  rescueFrame=0;
  rescueTimeLeft=RESCUE_TIME_LIMIT;
  rescueLastTimestamp=performance.now();
  rescueHolding=false;
  rescueHoldTarget=null;

  const floor=rescueFloorCells();
  rescuePlayer=rescueRandomSpawn(floor,[],0);
  rescueScammer=rescueRandomSpawn(floor,[rescuePlayer],10);

  rescuePlayerVisual={...rescuePlayer};
  rescueScammerVisual={...rescueScammer};
  rescuePopAppId=null;
  rescuePopStartedAt=0;

  const itemApps=rescueShuffle(rescueApps.filter(app=>!app.exit)).slice(0,4);
  rescueItems=rescueDataTypes.map((data,index)=>{
    const app=itemApps[index];
    const terminal=appTerminal(app);
    return {...data,appId:app.id,appLabel:app.label,x:terminal.x,y:terminal.y,collected:false};
  });

  rescueSecuredEl.textContent='0 / 4';
  rescueAlertEl.textContent='LOW';
  updateRescueTimerUI();
  rescueObjectiveTitle.textContent='Secure 4 compromised apps';
  rescueObjectiveText.textContent='Stand on a glowing app terminal and hold E / Space for 3 seconds.';
  rescueMessage.textContent='MISSION START — locate the glowing compromised apps.';
  rescueActionButton.textContent='HOLD TO SECURE';
  rescueActionButton.classList.remove('action-ready','action-holding');

  rescueOverlay.classList.add('hidden-overlay');
  updateRescueAlert();
  drawRescue();

  rescueEnemyTimer=setInterval(rescueEnemyStep,620);
  rescueLoop(performance.now());
}

function stopRescueGame(){
  rescueActive=false;
  rescueHolding=false;
  rescueHoldTarget=null;
  if(rescueLoopId){cancelAnimationFrame(rescueLoopId);rescueLoopId=null;}
  if(rescueEnemyTimer){clearInterval(rescueEnemyTimer);rescueEnemyTimer=null;}
  if(rescueTimerId){clearInterval(rescueTimerId);rescueTimerId=null;}
}

function rescueLoop(timestamp){
  if(!rescueActive)return;
  const delta=Math.min(100,timestamp-rescueLastTimestamp);
  rescueLastTimestamp=timestamp;
  rescueTimeLeft-=delta/1000;
  if(rescueTimeLeft<=0){
    rescueTimeLeft=0;
    updateRescueTimerUI();
    loseRescueGame('TIME EXPIRED');
    return;
  }
  updateRescueTimerUI();
  updateRescueHold(timestamp);
  rescueFrame++;
  drawRescue();
  rescueLoopId=requestAnimationFrame(rescueLoop);
}

function updateRescueAlert(){
  const distance=rescueManhattan(rescuePlayer,rescueScammer);
  const visible=rescueLineOfSight(rescuePlayer,rescueScammer);
  if(visible&&distance<=7)rescueAlert=Math.min(100,rescueAlert+24);
  else if(distance<=3)rescueAlert=Math.min(100,rescueAlert+16);
  else if(distance<=6)rescueAlert=Math.min(100,rescueAlert+7);
  else rescueAlert=Math.max(0,rescueAlert-9);

  rescueAlertEl.textContent=rescueAlert>=70?'HIGH':rescueAlert>=35?'MEDIUM':'LOW';
}

function rescueEnemyStep(){
  if(!rescueActive)return;
  updateRescueAlert();
  let next=null;
  if(rescueAlert>=35){
    const path=rescueBfsPath(rescueScammer,rescuePlayer);
    if(path.length)next=path[0];
  }else{
    const choices=rescueShuffle(rescueNeighbors(rescueScammer));
    if(choices.length)next=choices[0];
  }
  if(next)rescueScammer=next;
  if(checkRescueCatch())return;
  if(rescueActive&&rescueAlert>=75&&Math.random()<0.45){
    const path=rescueBfsPath(rescueScammer,rescuePlayer);
    if(path.length){rescueScammer=path[0];checkRescueCatch();}
  }
  updateRescueAlert();
}

function checkRescueCatch(){
  if(rescueScammer.x===rescuePlayer.x&&rescueScammer.y===rescuePlayer.y){
    loseRescueGame('SCAMMER CAUGHT YOU');
    return true;
  }
  return false;
}

function moveRescue(dx,dy){
  if(!rescueActive)return;
  if(rescueHolding){
    stopRescueHold();
    rescueMessage.textContent='Securing cancelled — stay still while securing.';
  }
  const nx=rescuePlayer.x+dx;
  const ny=rescuePlayer.y+dy;
  if(!rescueIsWalkable(nx,ny))return;
  rescuePlayer={x:nx,y:ny};
  if(checkRescueCatch())return;
  updateRescueContext();
  updateRescueAlert();
}

function currentRescueItem(){
  return rescueItems.find(item=>!item.collected&&item.x===rescuePlayer.x&&item.y===rescuePlayer.y)||null;
}

function atRescueExit(){
  if(!rescueExitActive)return false;
  const exit=rescueExitCell();
  return rescuePlayer.x===exit.x&&rescuePlayer.y===exit.y;
}

function updateRescueContext(){
  const item=currentRescueItem();
  if(item){
    rescueActionButton.classList.add('action-ready');
    rescueActionButton.textContent='HOLD E / SPACE';
    rescueMessage.textContent=`${item.appLabel} is compromised — hold E / Space for 3 seconds.`;
    return;
  }
  if(atRescueExit()){
    rescueActionButton.classList.add('action-ready');
    rescueActionButton.textContent='HOLD TO LOCK OUT';
    rescueMessage.textContent='Settings ready — hold E / Space for 5 seconds to lock the scammer out.';
    return;
  }
  rescueActionButton.classList.remove('action-ready','action-holding');
  rescueActionButton.textContent=rescueExitActive?'GO TO SETTINGS':'HOLD TO SECURE';
}

function startRescueHold(){
  if(!rescueActive||rescueHolding)return;
  const item=currentRescueItem();
  const exit=atRescueExit();
  if(!item&&!exit){
    updateRescueContext();
    return;
  }
  rescueHolding=true;
  rescueHoldStartedAt=performance.now();
  rescueHoldTarget=item?{type:'item',item}:{type:'exit'};
  rescueActionButton.classList.add('action-holding');
}

function stopRescueHold(){
  rescueHolding=false;
  rescueHoldTarget=null;
  rescueHoldStartedAt=0;
  rescueActionButton.classList.remove('action-holding');
}

function updateRescueHold(now){
  if(!rescueHolding||!rescueHoldTarget)return;
  const duration=rescueHoldTarget.type==='exit'?RESCUE_LOCKOUT_TIME:RESCUE_SECURE_TIME;
  const progress=Math.min(1,(now-rescueHoldStartedAt)/duration);
  const pct=Math.round(progress*100);
  rescueActionButton.textContent=rescueHoldTarget.type==='exit'?`LOCKING OUT… ${pct}%`:`SECURING… ${pct}%`;
  /* securing makes noise: alert slowly rises while you stand still */
  rescueAlert=Math.min(100,rescueAlert+0.10);
  if(progress>=1){
    if(rescueHoldTarget.type==='exit'){
      stopRescueHold();
      winRescueGame();
    }else{
      const item=rescueHoldTarget.item;
      stopRescueHold();
      secureRescueItem(item);
    }
  }
}

function secureRescueItem(item){
  if(item.collected)return;
  item.collected=true;

  rescuePopAppId=item.appId;
  rescuePopStartedAt=performance.now();

  rescueSecured++;
  rescueSecuredEl.textContent=`${rescueSecured} / 4`;
  rescueMessage.textContent=`✓ ${item.appLabel} secured — ${item.name} recovered.`;
  if(rescueSecured>=4){
    rescueExitActive=true;
    rescueObjectiveTitle.textContent='Final objective: lock out the scammer';
    rescueObjectiveText.textContent='Reach Settings and hold E / Space for 5 seconds before time runs out.';
    rescueActionButton.textContent='GO TO SETTINGS';
  }
  updateRescueContext();
}

function rescueExitCell(){return appTerminal(rescueApps.find(app=>app.exit));}

function winRescueGame(){
  stopRescueGame();
  rescueOverlay.classList.remove('hidden-overlay');
  rescueOverlay.querySelector('.overlay-card').innerHTML=`
    <span class="mini-pixel-icon">🛡</span>
    <h3>ACCOUNT SECURED</h3>
    <p>You secured all four compromised apps and completed the Settings lockout before the timer expired.</p>
    <button id="restartRescue" class="main-btn" type="button">Rescue another phone</button>
  `;
  document.getElementById('restartRescue').addEventListener('click',startRescueGame);
  if(victorySound){victorySound.pause();victorySound.currentTime=0;victorySound.play().catch(()=>{});}
}

function loseRescueGame(reason='DATA BREACH'){
  stopRescueGame();
  rescueOverlay.classList.remove('hidden-overlay');
  rescueOverlay.querySelector('.overlay-card').innerHTML=`
    <span class="mini-pixel-icon">⚠</span>
    <h3>${reason}</h3>
    <p>${reason==='TIME EXPIRED'?'The scammer finished the breach before you secured the phone.':'The scammer reached you before you could finish the rescue.'}</p>
    <button id="restartRescue" class="main-btn" type="button">Try again</button>
  `;
  document.getElementById('restartRescue').addEventListener('click',startRescueGame);
}

function roundRect(ctx,x,y,w,h,r,fill=true,stroke=false,fillStyle=null,strokeStyle=null,lineWidth=1){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
  if(fill){if(fillStyle!==null)ctx.fillStyle=fillStyle;ctx.fill();}
  if(stroke){if(strokeStyle!==null)ctx.strokeStyle=strokeStyle;ctx.lineWidth=lineWidth;ctx.stroke();}
}

function drawWallpaper(W,H){
  const bg=rctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,'#6c86ff');
  bg.addColorStop(.38,'#8f69ea');
  bg.addColorStop(.72,'#6d56d7');
  bg.addColorStop(1,'#483594');
  rctx.fillStyle=bg;
  rctx.fillRect(0,0,W,H);

  const blobs=[
    [W*.13,H*.18,W*.17,'rgba(255,178,222,.20)'],
    [W*.84,H*.20,W*.20,'rgba(136,223,255,.18)'],
    [W*.74,H*.78,W*.17,'rgba(255,255,255,.11)'],
    [W*.24,H*.76,W*.16,'rgba(255,236,166,.10)']
  ];
  blobs.forEach(([x,y,r,c])=>{
    const g=rctx.createRadialGradient(x,y,0,x,y,r);
    g.addColorStop(0,c);
    g.addColorStop(1,'rgba(255,255,255,0)');
    rctx.fillStyle=g;
    rctx.beginPath();
    rctx.arc(x,y,r,0,Math.PI*2);
    rctx.fill();
  });

  const dots=[
    [W*.09,H*.13,8],[W*.17,H*.31,5],[W*.23,H*.12,6],[W*.30,H*.26,4],
    [W*.76,H*.15,7],[W*.82,H*.31,5],[W*.88,H*.18,4],[W*.69,H*.28,6],
    [W*.14,H*.67,6],[W*.22,H*.82,4],[W*.83,H*.68,5],[W*.77,H*.86,7],
    [W*.56,H*.10,4],[W*.61,H*.89,5],[W*.47,H*.82,4],[W*.39,H*.18,5]
  ];
  dots.forEach(([x,y,r])=>{
    rctx.fillStyle='rgba(255,255,255,.34)';
    rctx.beginPath();
    rctx.arc(x,y,r,0,Math.PI*2);
    rctx.fill();
  });

  const stars=[
    [W*.12,H*.46],[W*.27,H*.58],[W*.66,H*.17],[W*.92,H*.42],[W*.54,H*.72],[W*.73,H*.56]
  ];
  stars.forEach(([x,y])=>{
    rctx.strokeStyle='rgba(255,255,255,.42)';
    rctx.lineWidth=3;
    rctx.beginPath();
    rctx.moveTo(x-10,y);rctx.lineTo(x+10,y);
    rctx.moveTo(x,y-10);rctx.lineTo(x,y+10);
    rctx.stroke();
    rctx.beginPath();
    rctx.arc(x,y,3.4,0,Math.PI*2);
    rctx.fillStyle='rgba(255,255,255,.48)';
    rctx.fill();
  });
}

function drawStatusBar(W){
  roundRect(rctx,W/2-260,24,520,62,31,true,false,'rgba(19,14,34,.34)');
  rctx.fillStyle='#fff';rctx.textAlign='left';rctx.font='700 32px sans-serif';rctx.fillText('9:41',W/2-220,64);
  rctx.textAlign='right';rctx.font='700 26px sans-serif';rctx.fillText('LTE  🔋',W/2+220,63);
}

function drawRescuePreview(){
  const W=rescueCanvas.width,H=rescueCanvas.height;
  drawWallpaper(W,H);drawStatusBar(W);
  rescueApps.forEach(app=>drawRescueApp(app,false));
  roundRect(rctx,W/2-500,H-205,1000,120,36,true,false,'rgba(18,14,29,.52)');
  rctx.textAlign='center';rctx.fillStyle='#fff';rctx.font='700 74px sans-serif';rctx.fillText('DATA RESCUE',W/2,H-158);
  rctx.font='600 31px sans-serif';rctx.fillStyle='rgba(244,238,255,.95)';rctx.fillText('75 seconds • secure 4 apps • lock out the scammer',W/2,H-104);
}

function drawRescueApp(app,gameMode=true){
  const R=rescueAppRect(app);

  const baseSize=Math.min(R.w,R.h)*1.04;
  const centerX=R.x+R.w/2;
  const centerY=R.y+R.h/2-2;

  const isTarget=
    gameMode &&
    rescueItems.some(
      i=>!i.collected&&i.appId===app.id
    );

  const isDone=
    gameMode &&
    rescueItems.some(
      i=>i.collected&&i.appId===app.id
    );

  const exitGlow=
    app.exit&&rescueExitActive;

  const isBeingSecured=
    gameMode &&
    rescueHolding &&
    rescueHoldTarget &&
    rescueHoldTarget.type==='item' &&
    rescueHoldTarget.item.appId===app.id;

  const pulse=
    (Math.sin(rescueFrame*.09)+1)*.5;

  let appScale=1;

  /*
    While securing, gently breathe/zoom the app.
  */
  if(isBeingSecured){
    appScale+=
      .055+
      Math.sin(rescueFrame*.18)*.025;
  }

  /*
    When securing finishes, give the app one clean completion pop.
  */
  if(
    rescuePopAppId===app.id &&
    rescuePopStartedAt
  ){
    const elapsed=
      performance.now()-
      rescuePopStartedAt;

    const popProgress=
      Math.min(
        1,
        elapsed/620
      );

    appScale+=
      Math.sin(
        popProgress*Math.PI
      )*.16;

    if(popProgress>=1){
      rescuePopAppId=null;
      rescuePopStartedAt=0;
    }
  }

  const iconSize=
    baseSize*appScale;

  const squareX=
    centerX-iconSize/2;

  const squareY=
    centerY-iconSize/2;

  if(isTarget||exitGlow||isBeingSecured){
    let glowColor=
      isTarget
        ?`rgba(255,236,118,${.18+.11*pulse})`
        :`rgba(92,255,176,${.18+.12*pulse})`;

    if(isBeingSecured){
      glowColor=
        `rgba(255,246,169,${.28+.18*pulse})`;
    }

    rctx.fillStyle=glowColor;

    rctx.beginPath();

    rctx.arc(
      centerX,
      centerY,
      iconSize*.70,
      0,
      Math.PI*2
    );

    rctx.fill();
  }

  roundRect(
    rctx,
    squareX+10,
    squareY+14,
    iconSize,
    iconSize,
    Math.max(26,R.tile*.28),
    true,
    false,
    'rgba(29,19,54,.25)'
  );

  roundRect(
    rctx,
    squareX,
    squareY,
    iconSize,
    iconSize,
    Math.max(26,R.tile*.28),
    true,
    false,
    app.color
  );

  roundRect(
    rctx,
    squareX,
    squareY,
    iconSize,
    iconSize,
    Math.max(26,R.tile*.28),
    false,
    true,
    null,
    isBeingSecured
      ?'rgba(255,248,190,.92)'
      :'rgba(255,255,255,.36)',
    isBeingSecured?7:4
  );

  roundRect(
    rctx,
    squareX+iconSize*.08,
    squareY+iconSize*.08,
    iconSize*.84,
    iconSize*.42,
    Math.max(18,R.tile*.18),
    true,
    false,
    'rgba(255,255,255,.18)'
  );

  /*
    Icon is now exactly centered in the square.
  */
  rctx.save();

  rctx.textAlign='center';
  rctx.textBaseline='middle';

  rctx.fillStyle='#fff';

  rctx.font=
    `${Math.max(
      52,
      R.tile*.76
    )}px sans-serif`;

  rctx.fillText(
    app.icon,
    centerX,
    centerY
  );

  rctx.restore();

  /*
    App name stays under the square, separate from the icon.
  */
  rctx.textAlign='center';
  rctx.textBaseline='alphabetic';

  rctx.fillStyle='#fff';

  rctx.font=
    `800 ${Math.max(
      22,
      R.tile*.21
    )}px sans-serif`;

  rctx.fillText(
    app.label,
    centerX,
    R.y+R.h+42
  );

  if(isTarget){
    rctx.fillStyle='#fff4a8';

    rctx.font=
      `900 ${Math.max(
        15,
        R.tile*.15
      )}px sans-serif`;

    rctx.fillText(
      isBeingSecured
        ?'SECURING…'
        :'COMPROMISED',
      centerX,
      squareY-20
    );
  }else if(isDone){
    rctx.fillStyle='#d8ffe9';

    rctx.font=
      `900 ${Math.max(
        15,
        R.tile*.15
      )}px sans-serif`;

    rctx.fillText(
      'SECURED ✓',
      centerX,
      squareY-20
    );
  }else if(exitGlow){
    rctx.fillStyle='#d8ffe9';

    rctx.font=
      `900 ${Math.max(
        15,
        R.tile*.15
      )}px sans-serif`;

    rctx.fillText(
      'FINAL LOCKOUT',
      centerX,
      squareY-20
    );
  }
}

function drawRescueHoldProgress(){
  if(!rescueHolding||!rescueHoldTarget)return;
  const now=performance.now();
  const duration=rescueHoldTarget.type==='exit'?RESCUE_LOCKOUT_TIME:RESCUE_SECURE_TIME;
  const progress=Math.min(1,(now-rescueHoldStartedAt)/duration);
  const C=rescueCellCenter(rescuePlayer.x,rescuePlayer.y);
  const radius=C.tile*.31;
  rctx.lineWidth=Math.max(8,C.tile*.08);
  rctx.strokeStyle='rgba(255,255,255,.24)';rctx.beginPath();rctx.arc(C.x,C.y-radius*.05,radius,-Math.PI/2,Math.PI*1.5);rctx.stroke();
  rctx.strokeStyle=rescueHoldTarget.type==='exit'?'#7dffc1':'#fff08c';rctx.beginPath();rctx.arc(C.x,C.y-radius*.05,radius,-Math.PI/2,-Math.PI/2+Math.PI*2*progress);rctx.stroke();
}

function drawRescue(){
  const L=rescueLayout();
  const {W,H,tile}=L;
  rctx.clearRect(0,0,W,H);
  drawWallpaper(W,H);drawStatusBar(W);

  for(let y=1;y<RESCUE_ROWS-1;y++){
    for(let x=1;x<RESCUE_COLS-1;x++){
      if(rescueMap[y][x]!== '#'){
        const C=rescueCellCenter(x,y);
        rctx.fillStyle='rgba(255,255,255,.10)';
        rctx.beginPath();
        rctx.arc(C.x,C.y,tile*.045,0,Math.PI*2);
        rctx.fill();
      }
    }
  }

  rescueApps.forEach(app=>drawRescueApp(app,true));

  rescueItems.forEach(item=>{
    if(item.collected)return;
    const C=rescueCellCenter(item.x,item.y);
    const p=(Math.sin(rescueFrame*.1)+1)*.5;
    rctx.fillStyle=`rgba(255,239,126,${.60+.22*p})`;
    rctx.beginPath();rctx.arc(C.x,C.y,tile*.22+tile*.03*p,0,Math.PI*2);rctx.fill();
    rctx.fillStyle='#3f3159';rctx.font=`900 ${Math.max(16,tile*.15)}px monospace`;rctx.textAlign='center';rctx.fillText(item.icon,C.x,C.y+tile*.04);
  });

  /*
    Smooth visual movement:
    game logic still uses exact grid cells, but the characters glide
    toward those cells instead of visibly teleporting.
  */
  rescuePlayerVisual.x+=
    (rescuePlayer.x-rescuePlayerVisual.x)*.22;

  rescuePlayerVisual.y+=
    (rescuePlayer.y-rescuePlayerVisual.y)*.22;

  rescueScammerVisual.x+=
    (rescueScammer.x-rescueScammerVisual.x)*.16;

  rescueScammerVisual.y+=
    (rescueScammer.y-rescueScammerVisual.y)*.16;

  const sC=
    rescueCellCenter(
      rescueScammerVisual.x,
      rescueScammerVisual.y
    );

  const pC=
    rescueCellCenter(
      rescuePlayerVisual.x,
      rescuePlayerVisual.y
    );

  const radius=tile*2.1;
  const g=rctx.createRadialGradient(sC.x,sC.y,8,sC.x,sC.y,radius);g.addColorStop(0,'rgba(239,79,101,.24)');g.addColorStop(1,'rgba(239,79,101,0)');rctx.fillStyle=g;rctx.beginPath();rctx.arc(sC.x,sC.y,radius,0,Math.PI*2);rctx.fill();

  // cartoon scammer - sneaky little villain
  rctx.fillStyle='#ef4f65';
  roundRect(rctx,sC.x-tile*.20,sC.y-tile*.01,tile*.40,tile*.34,Math.max(10,tile*.10),true,false,'#ef4f65');
  rctx.fillStyle='#ffd6d8';
  rctx.beginPath();rctx.arc(sC.x,sC.y-tile*.16,tile*.118,0,Math.PI*2);rctx.fill();
  rctx.fillStyle='#3b0c16';
  rctx.beginPath();rctx.moveTo(sC.x-tile*.10,sC.y-tile*.29);rctx.lineTo(sC.x-tile*.02,sC.y-tile*.23);rctx.lineTo(sC.x-tile*.07,sC.y-tile*.17);rctx.fill();
  rctx.beginPath();rctx.moveTo(sC.x+tile*.10,sC.y-tile*.29);rctx.lineTo(sC.x+tile*.02,sC.y-tile*.23);rctx.lineTo(sC.x+tile*.07,sC.y-tile*.17);rctx.fill();
  rctx.fillRect(sC.x-tile*.06,sC.y-tile*.18,tile*.026,tile*.026);
  rctx.fillRect(sC.x+tile*.035,sC.y-tile*.18,tile*.026,tile*.026);
  rctx.strokeStyle='#3b0c16';rctx.lineWidth=Math.max(2,tile*.018);
  rctx.beginPath();rctx.arc(sC.x,sC.y-tile*.12,tile*.05,0,Math.PI);rctx.stroke();
  rctx.fillStyle='#1d1010';
  rctx.fillRect(sC.x-tile*.09,sC.y+tile*.29,tile*.05,tile*.11);
  rctx.fillRect(sC.x+tile*.04,sC.y+tile*.29,tile*.05,tile*.11);

  // cartoon player - cyber hero with cape + shield
  rctx.fillStyle='#d9c6ff';
  roundRect(rctx,pC.x-tile*.20,pC.y-tile*.01,tile*.40,tile*.34,Math.max(10,tile*.10),true,false,'#d9c6ff');
  rctx.fillStyle='#6d48d6';
  rctx.beginPath();
  rctx.moveTo(pC.x-tile*.18,pC.y+tile*.05);
  rctx.lineTo(pC.x-tile*.30,pC.y+tile*.24);
  rctx.lineTo(pC.x-tile*.16,pC.y+tile*.28);
  rctx.closePath();
  rctx.fill();
  rctx.fillStyle='#fff0df';
  rctx.beginPath();rctx.arc(pC.x,pC.y-tile*.16,tile*.118,0,Math.PI*2);rctx.fill();
  rctx.fillStyle='#6e42ae';
  roundRect(rctx,pC.x-tile*.13,pC.y+tile*.03,tile*.26,tile*.074,Math.max(4,tile*.03),true,false,'#6e42ae');
  rctx.beginPath();
  rctx.moveTo(pC.x+tile*.16,pC.y-tile*.02);
  rctx.lineTo(pC.x+tile*.24,pC.y+tile*.03);
  rctx.lineTo(pC.x+tile*.20,pC.y+tile*.15);
  rctx.lineTo(pC.x+tile*.12,pC.y+tile*.11);
  rctx.closePath();
  rctx.fillStyle='#99e6ff';
  rctx.fill();
  rctx.strokeStyle='rgba(255,255,255,.75)';rctx.lineWidth=Math.max(2,tile*.018);rctx.stroke();
  rctx.fillStyle='#1a0b22';
  rctx.fillRect(pC.x-tile*.06,pC.y-tile*.18,tile*.026,tile*.026);
  rctx.fillRect(pC.x+tile*.035,pC.y-tile*.18,tile*.026,tile*.026);
  rctx.fillRect(pC.x-tile*.09,pC.y+tile*.29,tile*.05,tile*.11);
  rctx.fillRect(pC.x+tile*.04,pC.y+tile*.29,tile*.05,tile*.11);

  drawRescueHoldProgress();

  if(rescueAlert>=70){rctx.fillStyle=`rgba(170,18,38,${.07+(rescueAlert/100)*.11})`;rctx.fillRect(0,0,W,H);}
  roundRect(rctx,W/2-105,H-34,210,7,4,true,false,'rgba(255,255,255,.34)');
}

window.addEventListener('keydown',event=>{
  if(!rescueActive)return;
  const key=event.key.toLowerCase();
  if(key==='e'||key===' '){event.preventDefault();startRescueHold();return;}
  if(key==='arrowup'||key==='w'){event.preventDefault();moveRescue(0,-1);}
  if(key==='arrowdown'||key==='s'){event.preventDefault();moveRescue(0,1);}
  if(key==='arrowleft'||key==='a'){event.preventDefault();moveRescue(-1,0);}
  if(key==='arrowright'||key==='d'){event.preventDefault();moveRescue(1,0);}
});

window.addEventListener('keyup',event=>{
  if(!rescueActive)return;
  const key=event.key.toLowerCase();
  if((key==='e'||key===' ')&&rescueHolding){
    event.preventDefault();
    stopRescueHold();
    updateRescueContext();
  }
});

document.querySelectorAll('[data-rescue-move]').forEach(button=>button.addEventListener('click',()=>{
  const move=button.dataset.rescueMove;
  if(move==='up')moveRescue(0,-1);if(move==='down')moveRescue(0,1);if(move==='left')moveRescue(-1,0);if(move==='right')moveRescue(1,0);
}));

rescueActionButton.addEventListener('pointerdown',event=>{event.preventDefault();startRescueHold();});
['pointerup','pointercancel','pointerleave'].forEach(type=>rescueActionButton.addEventListener(type,()=>{
  if(rescueHolding){stopRescueHold();updateRescueContext();}
}));

document.getElementById('startRescue').addEventListener('click',startRescueGame);


// =========================================================
// MINIGAME 5 — FIREWALL RUSH
// Full-screen cartoon side-scrolling platformer
// =========================================================

const firewallCanvas=document.getElementById('firewallCanvas');
const fwctx=firewallCanvas.getContext('2d');
const firewallOverlay=document.getElementById('firewallOverlay');
const firewallDistanceEl=document.getElementById('firewallDistance');
const firewallChipsEl=document.getElementById('firewallChips');
const firewallShieldsEl=document.getElementById('firewallShields');
const firewallLivesEl=document.getElementById('firewallLives');
const firewallMissionEl=document.getElementById('firewallMission');

const FW_W=3840;
const FW_H=2160;
const FW_INITIAL_WORLD=18400;
const FW_EXTENSION_LENGTH=7800;
const FW_GROUND_Y=1780;
const FW_REQUIRED_CHIPS=12;
const FW_GRAVITY=4300;
const FW_MOVE_SPEED=850;
const FW_JUMP_SPEED=1580;

let firewallActive=false;
let firewallAnimation=null;
let firewallLastTime=0;
let firewallCameraX=0;
let firewallWallX=80;
let firewallWallSpeed=760;
let firewallKeys={left:false,right:false};
let firewallChips=0;
let firewallShields=0;
let firewallLives=3;
let firewallInvulnerableUntil=0;
let firewallStartedAt=0;
let firewallRunWon=false;
let firewallShake=0;
let firewallGeneratedEnd=FW_INITIAL_WORLD;
let firewallSafeZoneX=null;
let firewallExtensionIndex=0;

let fwPlayer={x:520,y:1400,w:118,h:156,vy:0,onGround:false,facing:1,step:0};
let fwPlatforms=[];
let fwCollectibles=[];
let fwHazards=[];

function fwRoundRect(ctx,x,y,w,h,r,fillStyle,strokeStyle=null,lineWidth=1){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
  if(fillStyle){ctx.fillStyle=fillStyle;ctx.fill();}
  if(strokeStyle){ctx.strokeStyle=strokeStyle;ctx.lineWidth=lineWidth;ctx.stroke();}
}

function updateFirewallLivesUI(){
  firewallLivesEl.textContent='♥'.repeat(firewallLives)+'♡'.repeat(Math.max(0,3-firewallLives));
}

function firewallRespawn(reason,now=performance.now()){
  firewallLives--;
  updateFirewallLivesUI();
  firewallShake=20;

  if(firewallLives<=0){
    loseFirewallGame(reason);
    return;
  }

  const safeGround=fwPlatforms
    .filter(p=>p.y===FW_GROUND_Y&&p.x+p.w>firewallWallX+560)
    .sort((a,b)=>{
      const ac=Math.abs((a.x+a.w/2)-fwPlayer.x);
      const bc=Math.abs((b.x+b.w/2)-fwPlayer.x);
      return ac-bc;
    })[0];

  if(safeGround){
    const minX=Math.max(safeGround.x+120,firewallWallX+560);
    const maxX=safeGround.x+safeGround.w-fwPlayer.w-120;
    fwPlayer.x=Math.max(minX,Math.min(maxX,fwPlayer.x));
    fwPlayer.y=safeGround.y-fwPlayer.h;
  }else{
    fwPlayer.x=Math.max(firewallWallX+620,520);
    fwPlayer.y=FW_GROUND_Y-fwPlayer.h;
  }

  fwPlayer.vy=0;
  fwPlayer.onGround=true;
  firewallWallX=Math.min(firewallWallX,fwPlayer.x-860);
  firewallInvulnerableUntil=now+2300;
  firewallMissionEl.textContent=`LIFE LOST — ${firewallLives} ${firewallLives===1?'life':'lives'} left!`;
}

function buildFirewallLevel(){
  firewallGeneratedEnd=FW_INITIAL_WORLD;
  firewallSafeZoneX=null;
  firewallExtensionIndex=0;

  /* Main road segments + elevated rescue platforms. */
  fwPlatforms=[
    {x:0,y:FW_GROUND_Y,w:2550,h:390},
    {x:2860,y:FW_GROUND_Y,w:1900,h:390},
    {x:5160,y:FW_GROUND_Y,w:2030,h:390},
    {x:7570,y:FW_GROUND_Y,w:2170,h:390},
    {x:10120,y:FW_GROUND_Y,w:2220,h:390},
    {x:12740,y:FW_GROUND_Y,w:2200,h:390},
    {x:15350,y:FW_GROUND_Y,w:3050,h:390},

    {x:2380,y:1570,w:460,h:95},
    {x:4690,y:1530,w:470,h:95},
    {x:7080,y:1500,w:500,h:95},
    {x:9660,y:1535,w:470,h:95},
    {x:12260,y:1495,w:500,h:95},
    {x:14860,y:1530,w:500,h:95},

    {x:1420,y:1430,w:430,h:85},
    {x:3300,y:1370,w:500,h:85},
    {x:5850,y:1340,w:470,h:85},
    {x:8200,y:1380,w:520,h:85},
    {x:10800,y:1350,w:490,h:85},
    {x:13480,y:1370,w:520,h:85},
    {x:16100,y:1360,w:520,h:85}
  ];

  const chipPositions=[
    [920,1590],[1330,1590],[1530,1245],[1910,1590],
    [2480,1380],[3180,1590],[3470,1180],[4110,1590],
    [4830,1340],[5520,1590],[6000,1150],[6640,1590],
    [7200,1300],[7930,1590],[8340,1190],[9020,1590],
    [9770,1340],[10480,1590],[10930,1160],[11740,1590],
    [12380,1290],[13100,1590],[13620,1180],[14310,1590],
    [14970,1330],[15720,1590],[16240,1160],[17020,1590],[17600,1530]
  ];

  const shieldPositions=[
    [2200,1570],[6240,1320],[11180,1330],[15180,1510]
  ];

  fwCollectibles=[
    ...chipPositions.map(([x,y],i)=>({type:'chip',x,y,r:42,collected:false,spin:i*.4})),
    ...shieldPositions.map(([x,y],i)=>({type:'shield',x,y,r:58,collected:false,spin:i*.8}))
  ];

  fwHazards=[
    {type:'spikes',x:1830,y:FW_GROUND_Y-72,w:260,h:72},
    {type:'bug',x:3910,y:FW_GROUND_Y-100,w:120,h:100,phase:.4},
    {type:'popup',x:5650,y:FW_GROUND_Y-125,w:190,h:125},
    {type:'spikes',x:8730,y:FW_GROUND_Y-72,w:280,h:72},
    {type:'bug',x:11370,y:FW_GROUND_Y-100,w:120,h:100,phase:2.1},
    {type:'popup',x:13880,y:FW_GROUND_Y-125,w:200,h:125},
    {type:'spikes',x:16650,y:FW_GROUND_Y-72,w:300,h:72}
  ];
}


function extendFirewallLevel(){
  const start=firewallGeneratedEnd;
  const n=firewallExtensionIndex++;

  /*
    Repeating platform section generated ahead of the player.
    If they miss chips, the game simply keeps building more level
    instead of stopping at a locked finish line.
  */
  const groundA={x:start,y:FW_GROUND_Y,w:2350,h:390};
  const groundB={x:start+2670,y:FW_GROUND_Y,w:2400,h:390};
  const groundC={x:start+5400,y:FW_GROUND_Y,w:2400,h:390};

  fwPlatforms.push(
    groundA,
    groundB,
    groundC,
    {x:start+2150,y:1510-(n%2)*70,w:540,h:95},
    {x:start+4870,y:1460+(n%3)*35,w:560,h:95},
    {x:start+1180,y:1350+(n%2)*55,w:500,h:85},
    {x:start+3540,y:1320+(n%3)*45,w:520,h:85},
    {x:start+6250,y:1360+(n%2)*45,w:500,h:85}
  );

  const chipPoints=[
    [start+760,1590],
    [start+1380,1180+(n%2)*70],
    [start+2240,1320-(n%2)*55],
    [start+3140,1590],
    [start+3770,1140+(n%3)*45],
    [start+4970,1290+(n%2)*35],
    [start+5800,1590],
    [start+6480,1190+(n%3)*35],
    [start+7220,1590]
  ];

  chipPoints.forEach(([x,y],i)=>{
    fwCollectibles.push({
      type:'chip',
      x,y,
      r:42,
      collected:false,
      spin:(n*9+i)*.37
    });
  });

  /* A shield appears every other generated section. */
  if(n%2===0){
    fwCollectibles.push({
      type:'shield',
      x:start+4500,
      y:1430,
      r:58,
      collected:false,
      spin:n*.9
    });
  }

  const hazardVariant=n%3;
  fwHazards.push(
    hazardVariant===0
      ?{type:'spikes',x:start+1750,y:FW_GROUND_Y-72,w:250,h:72}
      :{type:'bug',x:start+1750,y:FW_GROUND_Y-100,w:120,h:100,phase:n*.7},
    hazardVariant===1
      ?{type:'spikes',x:start+4070,y:FW_GROUND_Y-72,w:270,h:72}
      :{type:'popup',x:start+4070,y:FW_GROUND_Y-125,w:200,h:125},
    hazardVariant===2
      ?{type:'bug',x:start+6650,y:FW_GROUND_Y-100,w:120,h:100,phase:n*1.1}
      :{type:'spikes',x:start+6600,y:FW_GROUND_Y-72,w:280,h:72}
  );

  firewallGeneratedEnd=start+FW_EXTENSION_LENGTH;
}

function spawnFirewallSafeZone(){
  if(firewallSafeZoneX!==null)return;

  /*
    Once every required chip has actually been collected, create a final
    runway and portal ahead of the player. Until then there is no finish.
  */
  const runwayStart=Math.max(
    firewallGeneratedEnd,
    fwPlayer.x+3900
  );

  fwPlatforms.push({
    x:runwayStart,
    y:FW_GROUND_Y,
    w:4300,
    h:390
  });

  firewallSafeZoneX=runwayStart+3300;
  firewallGeneratedEnd=runwayStart+4300;
  firewallMissionEl.textContent='ALL DATA COLLECTED — SAFE ZONE INCOMING!';
}

function ensureFirewallWorldAhead(){
  if(firewallChips>=FW_REQUIRED_CHIPS){
    spawnFirewallSafeZone();
    return;
  }

  while(firewallGeneratedEnd-fwPlayer.x<9000){
    extendFirewallLevel();
  }
}

function resetFirewallPreview(){
  stopFirewallGame();
  buildFirewallLevel();
  firewallChips=0;
  firewallShields=0;
  firewallLives=3;
  updateFirewallLivesUI();
  firewallDistanceEl.textContent='0 m';
  firewallChipsEl.textContent=`0 / ${FW_REQUIRED_CHIPS}`;
  firewallShieldsEl.textContent='0';
  firewallMissionEl.textContent=`Collect all ${FW_REQUIRED_CHIPS} data chips. The run keeps going until you do.`;
  firewallOverlay.classList.remove('firewall-overlay-hidden');
  firewallOverlay.querySelector('.firewall-overlay-card').innerHTML=`
    <div class="firewall-logo">⚡</div>
    <span class="firewall-kicker">MINIGAME 05</span>
    <h2>Firewall Rush</h2>
    <p>
      The firewall is sweeping through the system. Run and jump across the digital world,
      collect <b>all ${FW_REQUIRED_CHIPS} data chips</b>, grab shields, dodge malware,
      and keep running until every chip is collected. Then the <b>SAFE ZONE</b> appears. You have <b>3 lives</b>.
    </p>
    <div class="firewall-controls-line">
      <span>← → / A D &nbsp; MOVE</span>
      <span>SPACE / W / ↑ &nbsp; JUMP</span>
    </div>
    <button id="startFirewallInner" class="main-btn" type="button">START RUN</button>
  `;
  document.getElementById('startFirewallInner').addEventListener('click',startFirewallGame);
  drawFirewallPreview();
}

function startFirewallGame(){
  stopFirewallGame();
  buildFirewallLevel();

  firewallActive=true;
  firewallRunWon=false;
  firewallLastTime=performance.now();
  firewallStartedAt=firewallLastTime;
  firewallCameraX=0;
  firewallWallX=80;
  firewallWallSpeed=760;
  firewallChips=0;
  firewallShields=0;
  firewallLives=3;
  updateFirewallLivesUI();
  firewallInvulnerableUntil=0;
  firewallShake=0;
  firewallKeys={left:false,right:false};

  fwPlayer={x:520,y:FW_GROUND_Y-156,w:118,h:156,vy:0,onGround:true,facing:1,step:0};

  firewallDistanceEl.textContent='0 m';
  firewallChipsEl.textContent=`0 / ${FW_REQUIRED_CHIPS}`;
  firewallShieldsEl.textContent='0';
  firewallMissionEl.textContent=`RUN! Collect all ${FW_REQUIRED_CHIPS} data chips — there is no finish until you do.`;
  firewallOverlay.classList.add('firewall-overlay-hidden');

  ensureFirewallWorldAhead();
  firewallAnimation=requestAnimationFrame(firewallLoop);
}

function stopFirewallGame(){
  firewallActive=false;
  firewallKeys.left=false;
  firewallKeys.right=false;
  if(firewallAnimation){
    cancelAnimationFrame(firewallAnimation);
    firewallAnimation=null;
  }
}

function firewallJump(){
  if(!firewallActive)return;
  if(fwPlayer.onGround){
    fwPlayer.vy=-FW_JUMP_SPEED;
    fwPlayer.onGround=false;
  }
}

function firewallLoop(now){
  if(!firewallActive)return;

  let dt=(now-firewallLastTime)/1000;
  firewallLastTime=now;
  dt=Math.min(dt,.033);

  updateFirewallGame(dt,now);
  drawFirewallGame(now);

  if(firewallActive){
    firewallAnimation=requestAnimationFrame(firewallLoop);
  }
}

function updateFirewallGame(dt,now){
  let move=0;
  if(firewallKeys.left)move-=1;
  if(firewallKeys.right)move+=1;

  if(move!==0){
    fwPlayer.facing=move;
    fwPlayer.step+=dt*12;
  }

  /* Small forward drift keeps the run moving, but the player is still in control. */
  const drift=205;
  fwPlayer.x+=(move*FW_MOVE_SPEED+drift)*dt;
  fwPlayer.x=Math.max(40,fwPlayer.x);

  const previousBottom=fwPlayer.y+fwPlayer.h;
  fwPlayer.vy+=FW_GRAVITY*dt;
  fwPlayer.y+=fwPlayer.vy*dt;
  fwPlayer.onGround=false;

  for(const p of fwPlatforms){
    const playerRight=fwPlayer.x+fwPlayer.w;
    const playerBottom=fwPlayer.y+fwPlayer.h;
    const horizontal=playerRight>p.x+12&&fwPlayer.x<p.x+p.w-12;

    if(horizontal&&fwPlayer.vy>=0&&previousBottom<=p.y+22&&playerBottom>=p.y){
      fwPlayer.y=p.y-fwPlayer.h;
      fwPlayer.vy=0;
      fwPlayer.onGround=true;
    }
  }

  if(fwPlayer.y>FW_H+500){
    firewallRespawn('SYSTEM DROP',now);
    return;
  }

  /* REAL CHASE LOGIC */
  const chaseElapsed=(now-firewallStartedAt)/1000;
  const gapToFirewall=fwPlayer.x-firewallWallX;
  const pressureBoost=Math.min(190,chaseElapsed*3.3);

  if(gapToFirewall>1400){
    firewallWallSpeed=1390+pressureBoost;
  }else if(gapToFirewall>1100){
    firewallWallSpeed=1210+pressureBoost;
  }else if(gapToFirewall>850){
    firewallWallSpeed=1065+pressureBoost;
  }else if(gapToFirewall>620){
    firewallWallSpeed=935+pressureBoost;
  }else if(gapToFirewall>430){
    firewallWallSpeed=820+pressureBoost;
  }else{
    firewallWallSpeed=710+pressureBoost;
  }

  firewallWallX+=firewallWallSpeed*dt;

  if(firewallWallX>fwPlayer.x+25){
    firewallRespawn('FIREWALL OVERRUN',now);
    return;
  }

  collectFirewallItems();
  checkFirewallHazards(now);

  ensureFirewallWorldAhead();

  if(
    firewallSafeZoneX!==null &&
    fwPlayer.x+fwPlayer.w>=firewallSafeZoneX
  ){
    winFirewallGame();
    return;
  }

  const targetCamera=fwPlayer.x-FW_W*.28;
  firewallCameraX+=(Math.max(0,targetCamera)-firewallCameraX)*.09;

  const metres=Math.max(0,Math.floor((fwPlayer.x-520)/12));
  firewallDistanceEl.textContent=`${metres} m`;

  const liveGap=fwPlayer.x-firewallWallX;
  if(liveGap<470&&firewallActive){
    firewallMissionEl.textContent='⚠ FIREWALL CLOSE — MOVE!';
  }else if(liveGap<720&&firewallActive){
    firewallMissionEl.textContent='Firewall gaining on you… keep running!';
  }

  if(firewallShake>0)firewallShake=Math.max(0,firewallShake-dt*24);
}

function collectFirewallItems(){
  const cx=fwPlayer.x+fwPlayer.w/2;
  const cy=fwPlayer.y+fwPlayer.h/2;

  for(const item of fwCollectibles){
    if(item.collected)continue;
    const dx=cx-item.x;
    const dy=cy-item.y;
    if(Math.hypot(dx,dy)<item.r+70){
      item.collected=true;
      if(item.type==='chip'){
        firewallChips++;
        firewallChipsEl.textContent=`${firewallChips} / ${FW_REQUIRED_CHIPS}`;
        if(firewallChips>=FW_REQUIRED_CHIPS){
          spawnFirewallSafeZone();
          firewallMissionEl.textContent='ALL 12 DATA CHIPS COLLECTED — reach the SAFE ZONE!';
        }else{
          const remaining=Math.max(0,FW_REQUIRED_CHIPS-firewallChips);
          firewallMissionEl.textContent=`Data chip secured! ${remaining} more to collect — keep running!`;
        }
      }else{
        firewallShields=Math.min(3,firewallShields+1);
        firewallShieldsEl.textContent=String(firewallShields);
        firewallMissionEl.textContent='SHIELD TOKEN! One malware hit can be blocked.';
      }
    }
  }
}

function rectsOverlap(a,b){
  return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
}

function checkFirewallHazards(now){
  if(now<firewallInvulnerableUntil)return;

  const playerBox={x:fwPlayer.x+20,y:fwPlayer.y+20,w:fwPlayer.w-40,h:fwPlayer.h-22};

  for(const hazard of fwHazards){
    let hy=hazard.y;
    if(hazard.type==='bug')hy+=Math.sin(now*.004+hazard.phase)*45;
    const box={x:hazard.x,y:hy,w:hazard.w,h:hazard.h};
    if(rectsOverlap(playerBox,box)){
      if(firewallShields>0){
        firewallShields--;
        firewallShieldsEl.textContent=String(firewallShields);
        firewallInvulnerableUntil=now+1450;
        fwPlayer.vy=-850;
        fwPlayer.x=Math.max(firewallWallX+240,fwPlayer.x-120);
        firewallWallX+=120;
        firewallShake=12;
        firewallMissionEl.textContent='SHIELD BROKEN — keep moving!';
      }else{
        firewallRespawn('MALWARE HIT',now);
      }
      return;
    }
  }
}

function winFirewallGame(){
  if(!firewallActive)return;
  firewallRunWon=true;
  stopFirewallGame();

  firewallOverlay.classList.remove('firewall-overlay-hidden');
  firewallOverlay.querySelector('.firewall-overlay-card').innerHTML=`
    <div class="firewall-logo firewall-win-logo">🛡</div>
    <span class="firewall-kicker">SAFE ZONE REACHED</span>
    <h2>SYSTEM SAVED!</h2>
    <p>You collected <b>all ${FW_REQUIRED_CHIPS} data chips</b>, unlocked the SAFE ZONE, and escaped the firewall.</p>
    <button id="restartFirewall" class="main-btn" type="button">RUN AGAIN</button>
  `;
  document.getElementById('restartFirewall').addEventListener('click',startFirewallGame);

  if(victorySound){
    victorySound.pause();
    victorySound.currentTime=0;
    victorySound.play().catch(()=>{});
  }
}

function loseFirewallGame(reason){
  if(!firewallActive)return;
  stopFirewallGame();

  firewallOverlay.classList.remove('firewall-overlay-hidden');
  firewallOverlay.querySelector('.firewall-overlay-card').innerHTML=`
    <div class="firewall-logo firewall-danger-logo">⚠</div>
    <span class="firewall-kicker">RUN FAILED</span>
    <h2>${reason}</h2>
    <p>${reason==='FIREWALL OVERRUN'
      ?'The firewall caught up. Keep moving and use the platforms to stay ahead.'
      :reason==='SYSTEM DROP'
        ?'You fell out of the system. Time your jumps across the gaps.'
        :'Malware got you. Grab a shield token before taking another risky route.'}</p>
    <button id="restartFirewall" class="main-btn" type="button">TRY AGAIN</button>
  `;
  document.getElementById('restartFirewall').addEventListener('click',startFirewallGame);
}

function drawFirewallPreview(){
  fwctx.clearRect(0,0,FW_W,FW_H);
  drawFirewallBackground(0,0);

  const groundY=1730;
  fwRoundRect(fwctx,450,groundY,2940,230,60,'#382b72','rgba(255,255,255,.18)',8);
  fwRoundRect(fwctx,520,groundY-24,2800,64,30,'#7a62df');

  for(let i=0;i<8;i++){
    drawDataChip(820+i*315,groundY-170,70,performance.now()+i*120);
  }

  drawFirewallWall(300,0,performance.now());
  drawFirewallRunner(2890,groundY-160,1,performance.now(),false);

  fwctx.textAlign='center';
  fwctx.fillStyle='#ffffff';
  fwctx.font='900 104px sans-serif';
  fwctx.fillText('FIREWALL RUSH',FW_W/2,610);
  fwctx.font='700 42px sans-serif';
  fwctx.fillStyle='rgba(255,255,255,.88)';
  fwctx.fillText('RUN • JUMP • COLLECT THEM ALL • ESCAPE',FW_W/2,690);
}

function drawFirewallBackground(cameraX,now){
  const g=fwctx.createLinearGradient(0,0,FW_W,FW_H);
  g.addColorStop(0,'#1b1649');
  g.addColorStop(.38,'#3a2b85');
  g.addColorStop(.72,'#5b3db2');
  g.addColorStop(1,'#25175f');
  fwctx.fillStyle=g;
  fwctx.fillRect(0,0,FW_W,FW_H);

  /* big cartoon digital moon */
  const moonX=FW_W*.78-(cameraX*.04)%500;
  fwctx.fillStyle='rgba(190,225,255,.18)';
  fwctx.beginPath();
  fwctx.arc(moonX,380,245,0,Math.PI*2);
  fwctx.fill();
  fwctx.strokeStyle='rgba(221,236,255,.24)';
  fwctx.lineWidth=8;
  fwctx.stroke();

  /* distant cyber skyline */
  for(let i=0;i<16;i++){
    const bw=150+(i%4)*35;
    const bh=240+(i%5)*80;
    let bx=i*290-(cameraX*.13)%290;
    if(bx<-300)bx+=16*290;
    const by=FW_GROUND_Y-bh+80;
    fwRoundRect(fwctx,bx,by,bw,bh,22,'rgba(19,16,63,.32)');
    for(let row=0;row<4;row++){
      fwctx.fillStyle='rgba(139,226,255,.20)';
      fwctx.fillRect(bx+28,by+46+row*62,bw-56,12);
    }
  }

  /* white cyber particles, inspired by the other game but denser */
  for(let i=0;i<44;i++){
    const seed=i*997;
    const x=((seed*3-cameraX*.20)%(FW_W+300)+FW_W+300)%(FW_W+300)-150;
    const y=140+((seed*7)%1280);
    const r=4+(i%4)*2;
    fwctx.fillStyle=`rgba(255,255,255,${.12+(i%3)*.06})`;
    fwctx.beginPath();fwctx.arc(x,y,r,0,Math.PI*2);fwctx.fill();
  }

  /* binary/code streaks */
  fwctx.font='700 28px monospace';
  fwctx.fillStyle='rgba(179,227,255,.14)';
  const code=['101101','SECURE','01001','DATA','110010','SAFE'];
  for(let i=0;i<10;i++){
    let x=((i*520-cameraX*.28)%(FW_W+650)+FW_W+650)%(FW_W+650)-300;
    let y=280+(i%5)*250;
    fwctx.fillText(code[i%code.length],x,y);
  }
}

function drawFirewallPlatform(p){
  const x=p.x-firewallCameraX;
  if(x>FW_W+200||x+p.w<-200)return;

  fwRoundRect(fwctx,x,p.y,p.w,p.h,34,'#35276e','rgba(255,255,255,.14)',6);
  fwRoundRect(fwctx,x+8,p.y+6,p.w-16,42,20,'#8067df');
  fwctx.fillStyle='rgba(140,224,255,.16)';
  for(let px=x+55;px<x+p.w-20;px+=145){
    fwctx.fillRect(px,p.y+72,68,10);
  }
}

function drawDataChip(x,y,size,now){
  const bob=Math.sin(now*.004+x*.01)*10;
  fwctx.save();
  fwctx.translate(x,y+bob);
  fwctx.rotate(now*.0018+x*.0004);
  fwctx.fillStyle='#87f4ff';
  fwctx.beginPath();
  fwctx.moveTo(0,-size*.52);fwctx.lineTo(size*.45,-size*.24);fwctx.lineTo(size*.45,size*.24);
  fwctx.lineTo(0,size*.52);fwctx.lineTo(-size*.45,size*.24);fwctx.lineTo(-size*.45,-size*.24);fwctx.closePath();
  fwctx.fill();
  fwctx.strokeStyle='#eaffff';fwctx.lineWidth=6;fwctx.stroke();
  fwctx.fillStyle='#2765a8';fwctx.fillRect(-size*.09,-size*.25,size*.18,size*.50);
  fwctx.restore();
}

function drawShieldToken(x,y,size,now){
  const bob=Math.sin(now*.004+x*.008)*12;
  fwctx.save();fwctx.translate(x,y+bob);
  const pulse=1+Math.sin(now*.006+x*.002)*.05;
  fwctx.scale(pulse,pulse);
  fwctx.fillStyle='rgba(145,255,207,.18)';fwctx.beginPath();fwctx.arc(0,0,size*.72,0,Math.PI*2);fwctx.fill();
  fwctx.fillStyle='#8affc7';
  fwctx.beginPath();fwctx.moveTo(0,-size*.52);fwctx.lineTo(size*.42,-size*.30);fwctx.lineTo(size*.35,size*.16);fwctx.quadraticCurveTo(0,size*.58,-size*.35,size*.16);fwctx.lineTo(-size*.42,-size*.30);fwctx.closePath();fwctx.fill();
  fwctx.strokeStyle='#ecfff6';fwctx.lineWidth=6;fwctx.stroke();
  fwctx.fillStyle='#2d8d7b';fwctx.font=`900 ${size*.42}px sans-serif`;fwctx.textAlign='center';fwctx.textBaseline='middle';fwctx.fillText('S',0,0);
  fwctx.restore();
}

function drawHazard(h,now){
  let x=h.x-firewallCameraX;
  let y=h.y;
  if(h.type==='bug')y+=Math.sin(now*.004+h.phase)*45;
  if(x>FW_W+250||x+h.w<-250)return;

  if(h.type==='spikes'){
    const count=Math.max(3,Math.floor(h.w/55));
    for(let i=0;i<count;i++){
      const sx=x+i*(h.w/count);
      fwctx.fillStyle='#ff5577';
      fwctx.beginPath();fwctx.moveTo(sx,h.y+h.h);fwctx.lineTo(sx+h.w/count*.5,h.y);fwctx.lineTo(sx+h.w/count,h.y+h.h);fwctx.closePath();fwctx.fill();
      fwctx.strokeStyle='#ffc0cf';fwctx.lineWidth=4;fwctx.stroke();
    }
  }else if(h.type==='bug'){
    fwctx.fillStyle='#ff5577';fwctx.beginPath();fwctx.arc(x+h.w/2,y+h.h/2,h.w*.37,0,Math.PI*2);fwctx.fill();
    fwctx.strokeStyle='#ffb3c5';fwctx.lineWidth=6;fwctx.stroke();
    fwctx.fillStyle='#2a133f';fwctx.beginPath();fwctx.arc(x+h.w*.42,y+h.h*.45,9,0,Math.PI*2);fwctx.arc(x+h.w*.62,y+h.h*.45,9,0,Math.PI*2);fwctx.fill();
    fwctx.strokeStyle='#ff8fa8';fwctx.lineWidth=6;
    for(let i=0;i<3;i++){
      fwctx.beginPath();fwctx.moveTo(x+12,y+25+i*25);fwctx.lineTo(x-20,y+12+i*35);fwctx.stroke();
      fwctx.beginPath();fwctx.moveTo(x+h.w-12,y+25+i*25);fwctx.lineTo(x+h.w+20,y+12+i*35);fwctx.stroke();
    }
  }else{
    fwRoundRect(fwctx,x,y,h.w,h.h,24,'#ffcc57','#fff0b2',6);
    fwctx.fillStyle='#643d31';fwctx.font='900 31px sans-serif';fwctx.textAlign='center';fwctx.fillText('DOWNLOAD',x+h.w/2,y+50);
    fwctx.fillStyle='#ff5e73';fwRoundRect(fwctx,x+32,y+72,h.w-64,34,17,'#ff5e73');
  }
}

function drawFirewallRunner(x,y,facing,now,shielded){
  const runPhase=now*.014;
  const legSwing=Math.sin(runPhase)*15;
  const bob=Math.abs(Math.sin(runPhase))*5;
  const capeWave=Math.sin(now*.009)*10;

  fwctx.save();
  fwctx.translate(x+59,y+77-bob);
  if(facing<0)fwctx.scale(-1,1);

  /* shield bubble when a token is active */
  if(shielded){
    const shieldPulse=1+Math.sin(now*.008)*.035;
    fwctx.save();
    fwctx.scale(shieldPulse,shieldPulse);
    fwctx.fillStyle='rgba(121,255,216,.08)';
    fwctx.beginPath();
    fwctx.arc(0,2,104,0,Math.PI*2);
    fwctx.fill();
    fwctx.strokeStyle='rgba(138,255,213,.88)';
    fwctx.lineWidth=11;
    fwctx.beginPath();
    fwctx.arc(0,2,96,0,Math.PI*2);
    fwctx.stroke();
    fwctx.restore();
  }

  /* energetic scarf/cape */
  fwctx.fillStyle='#7655ee';
  fwctx.beginPath();
  fwctx.moveTo(-29,-19);
  fwctx.quadraticCurveTo(-80,-2,-102,33+capeWave*.35);
  fwctx.quadraticCurveTo(-70,54+capeWave,-30,46);
  fwctx.closePath();
  fwctx.fill();

  /* backpack */
  fwRoundRect(fwctx,-52,-2,31,72,13,'#3b2a79','#a99cff',4);
  fwctx.fillStyle='#8df3ff';
  fwctx.fillRect(-47,15,19,10);

  /* legs + chunky sneakers */
  fwctx.strokeStyle='#2d2350';
  fwctx.lineWidth=18;
  fwctx.lineCap='round';
  fwctx.beginPath();
  fwctx.moveTo(-18,62);
  fwctx.lineTo(-27+legSwing*.45,112+legSwing*.35);
  fwctx.stroke();
  fwctx.beginPath();
  fwctx.moveTo(18,62);
  fwctx.lineTo(28-legSwing*.45,112-legSwing*.35);
  fwctx.stroke();

  fwRoundRect(fwctx,-51+legSwing*.45,104+legSwing*.35,49,22,11,'#8cf2ff','#ffffff',4);
  fwRoundRect(fwctx,4-legSwing*.45,104-legSwing*.35,49,22,11,'#ff8dd2','#ffffff',4);

  /* hoodie body */
  fwRoundRect(fwctx,-43,-17,86,91,27,'#d6c7ff','#ffffff',5);
  fwctx.fillStyle='#6446c7';
  fwRoundRect(fwctx,-32,18,64,20,10,'#6446c7');

  /* chest badge */
  fwctx.fillStyle='#8ff6ff';
  fwctx.beginPath();
  fwctx.moveTo(0,3);
  fwctx.lineTo(15,10);
  fwctx.lineTo(12,30);
  fwctx.quadraticCurveTo(0,42,-12,30);
  fwctx.lineTo(-15,10);
  fwctx.closePath();
  fwctx.fill();
  fwctx.strokeStyle='#ffffff';
  fwctx.lineWidth=3;
  fwctx.stroke();

  /* little arms */
  fwctx.strokeStyle='#cbb8ff';
  fwctx.lineWidth=17;
  fwctx.lineCap='round';
  fwctx.beginPath();
  fwctx.moveTo(-35,10);
  fwctx.lineTo(-56,-3-legSwing*.18);
  fwctx.stroke();
  fwctx.beginPath();
  fwctx.moveTo(35,10);
  fwctx.lineTo(57,22+legSwing*.18);
  fwctx.stroke();

  /* oversized cute helmet */
  fwctx.fillStyle='#f4efff';
  fwctx.beginPath();
  fwctx.arc(0,-60,49,0,Math.PI*2);
  fwctx.fill();
  fwctx.strokeStyle='#ffffff';
  fwctx.lineWidth=5;
  fwctx.stroke();

  /* helmet ears */
  fwRoundRect(fwctx,-56,-70,17,31,8,'#ff8dd2','#ffffff',3);
  fwRoundRect(fwctx,39,-70,17,31,8,'#8cf2ff','#ffffff',3);

  /* dark glass visor */
  fwRoundRect(fwctx,-39,-73,78,34,17,'#302650','#8cf2ff',5);

  /* expressive digital eyes */
  fwctx.fillStyle='#9bf7ff';
  fwctx.beginPath();
  fwctx.arc(-15,-56,6,0,Math.PI*2);
  fwctx.arc(15,-56,6,0,Math.PI*2);
  fwctx.fill();

  /* tiny happy mouth on visor */
  fwctx.strokeStyle='#ff9fd9';
  fwctx.lineWidth=4;
  fwctx.beginPath();
  fwctx.arc(0,-48,10,.15*Math.PI,.85*Math.PI);
  fwctx.stroke();

  /* antenna */
  fwctx.strokeStyle='#ffffff';
  fwctx.lineWidth=4;
  fwctx.beginPath();
  fwctx.moveTo(17,-104);
  fwctx.lineTo(26,-122);
  fwctx.stroke();
  fwctx.fillStyle='#ff8dd2';
  fwctx.beginPath();
  fwctx.arc(28,-126,8,0,Math.PI*2);
  fwctx.fill();

  fwctx.restore();
}
function drawFirewallWall(screenX,cameraX,now){
  const frontX=Math.max(0,Math.min(FW_W,screenX));
  if(frontX<=0)return;

  const g=fwctx.createLinearGradient(Math.max(0,frontX-900),0,frontX+30,0);
  g.addColorStop(0,'rgba(92,23,142,.96)');
  g.addColorStop(.45,'rgba(201,42,111,.96)');
  g.addColorStop(.80,'rgba(255,79,78,.98)');
  g.addColorStop(1,'rgba(255,211,92,1)');
  fwctx.fillStyle=g;
  fwctx.fillRect(0,0,frontX,FW_H);

  fwctx.save();
  fwctx.shadowColor='rgba(255,151,77,.95)';
  fwctx.shadowBlur=40;
  fwctx.strokeStyle='#ffd06e';
  fwctx.lineWidth=26;
  fwctx.beginPath();
  for(let y=0;y<=FW_H;y+=42){
    const wave=Math.sin(y*.020+now*.008)*34+Math.sin(y*.047-now*.006)*18;
    const x=frontX+wave;
    if(y===0)fwctx.moveTo(x,y);else fwctx.lineTo(x,y);
  }
  fwctx.stroke();
  fwctx.restore();

  fwctx.globalAlpha=.48;
  fwctx.strokeStyle='#fff0b5';
  fwctx.lineWidth=7;
  for(let y=100;y<FW_H;y+=120){
    fwctx.beginPath();
    let x=Math.max(30,frontX-520)+Math.sin(y*.03+now*.006)*70;
    fwctx.moveTo(x,y);
    for(let s=1;s<7;s++){
      x+=Math.sin(now*.004+y+s)*55;
      fwctx.lineTo(Math.min(frontX-18,x),y+s*45);
    }
    fwctx.stroke();
  }
  fwctx.globalAlpha=1;

  if(frontX>300){
    fwctx.fillStyle='rgba(255,255,255,.90)';
    fwctx.font='900 46px monospace';
    fwctx.textAlign='center';
    const labelX=Math.max(145,frontX*.52);
    for(let y=190;y<FW_H;y+=330){
      fwctx.fillText('⚠ FIREWALL',labelX,y);
    }
  }
}

function drawSafePortal(now){
  if(firewallSafeZoneX===null)return;
  const finishX=firewallSafeZoneX-firewallCameraX;
  if(finishX>FW_W+400||finishX<-400)return;
  const pulse=1+Math.sin(now*.005)*.05;
  fwctx.save();fwctx.translate(finishX,1390);fwctx.scale(pulse,pulse);
  fwctx.fillStyle='rgba(116,255,210,.16)';fwctx.beginPath();fwctx.arc(0,0,250,0,Math.PI*2);fwctx.fill();
  fwctx.strokeStyle='#8affcf';fwctx.lineWidth=30;fwctx.beginPath();fwctx.arc(0,0,175,0,Math.PI*2);fwctx.stroke();
  fwctx.strokeStyle='#eafff7';fwctx.lineWidth=10;fwctx.beginPath();fwctx.arc(0,0,135,0,Math.PI*2);fwctx.stroke();
  fwctx.fillStyle='#eafff7';fwctx.font='900 44px sans-serif';fwctx.textAlign='center';fwctx.fillText('SAFE',0,-16);fwctx.fillText('ZONE',0,40);
  fwctx.restore();
}

function drawFirewallGame(now){
  fwctx.clearRect(0,0,FW_W,FW_H);

  let shakeX=0,shakeY=0;
  if(firewallShake>0){
    shakeX=Math.sin(now*.08)*firewallShake;
    shakeY=Math.cos(now*.075)*firewallShake*.6;
  }

  fwctx.save();
  fwctx.translate(shakeX,shakeY);

  drawFirewallBackground(firewallCameraX,now);

  for(const p of fwPlatforms)drawFirewallPlatform(p);

  for(const item of fwCollectibles){
    if(item.collected)continue;
    const x=item.x-firewallCameraX;
    if(x<-160||x>FW_W+160)continue;
    if(item.type==='chip')drawDataChip(x,item.y,76,now+item.spin*500);
    else drawShieldToken(x,item.y,94,now+item.spin*500);
  }

  for(const h of fwHazards)drawHazard(h,now);
  drawSafePortal(now);

  const wallScreenX=firewallWallX-firewallCameraX;
  drawFirewallWall(wallScreenX,firewallCameraX,now);

  const px=fwPlayer.x-firewallCameraX;
  const flash=now<firewallInvulnerableUntil&&Math.floor(now/90)%2===0;
  if(!flash){
    drawFirewallRunner(px,fwPlayer.y,fwPlayer.facing,now,firewallShields>0);
  }

  fwctx.restore();
}

window.addEventListener('keydown',event=>{
  if(!firewallActive)return;
  const key=event.key.toLowerCase();
  if(key==='arrowleft'||key==='a'){event.preventDefault();firewallKeys.left=true;}
  if(key==='arrowright'||key==='d'){event.preventDefault();firewallKeys.right=true;}
  if(key==='arrowup'||key==='w'||key===' '){event.preventDefault();firewallJump();}
});

window.addEventListener('keyup',event=>{
  if(!firewallActive)return;
  const key=event.key.toLowerCase();
  if(key==='arrowleft'||key==='a')firewallKeys.left=false;
  if(key==='arrowright'||key==='d')firewallKeys.right=false;
});

document.querySelectorAll('[data-firewall-control]').forEach(button=>{
  const control=button.dataset.firewallControl;
  if(control==='jump'){
    button.addEventListener('pointerdown',event=>{event.preventDefault();firewallJump();});
    return;
  }
  button.addEventListener('pointerdown',event=>{
    event.preventDefault();
    firewallKeys[control]=true;
  });
  ['pointerup','pointercancel','pointerleave'].forEach(type=>{
    button.addEventListener(type,()=>{firewallKeys[control]=false;});
  });
});

document.getElementById('startFirewall').addEventListener('click',startFirewallGame);


// =========================================================
// MINIGAME 6 — CYBER CHASE
// App-to-app scammer hunt inside a phone
// =========================================================

const chaseHomeView=document.getElementById('chaseHomeView');
const chaseAppView=document.getElementById('chaseAppView');
const chaseAppGrid=document.getElementById('chaseAppGrid');
const chaseSceneBody=document.getElementById('chaseSceneBody');
const chaseSceneTitle=document.getElementById('chaseSceneTitle');
const chaseSceneIcon=document.getElementById('chaseSceneIcon');
const chaseSceneBadge=document.getElementById('chaseSceneBadge');
const chaseEvidenceEl=document.getElementById('chaseEvidence');
const chaseSignalEl=document.getElementById('chaseSignal');
const chaseCurrentAppEl=document.getElementById('chaseCurrentApp');
const chaseHomeMessage=document.getElementById('chaseHomeMessage');
const chaseClueOverlay=document.getElementById('chaseClueOverlay');
const chaseClueTitle=document.getElementById('chaseClueTitle');
const chaseClueText=document.getElementById('chaseClueText');
const chaseIntroOverlay=document.getElementById('chaseIntroOverlay');
const chaseBackHome=document.getElementById('chaseBackHome');
const chaseContinue=document.getElementById('chaseContinue');
const startCyberChase=document.getElementById('startCyberChase');

const chaseOrder=['messages','browser','files','photos','settings','mail'];
let chaseStep=0;
let chaseEvidence=0;
let chaseActive=false;
let chaseSolved=false;

const chaseScenes={
  messages:{
    title:'Messages',icon:'💬',signal:'WEAK',
    instruction:'The scammer messaged three people before disappearing. Open the conversation that looks suspicious.',
    render:()=>`
      <div class="inside-app messages-inside">
        <div class="inside-heading"><div><span class="scene-label">MESSAGES</span><h3>Recent conversations</h3></div><span class="scene-tip">Find the scammer’s trace</span></div>
        <div class="chat-list chase-choice-list">
          <button data-chase-answer="wrong"><span class="chat-avatar">M</span><div><b>Mum</b><p>Can you bring your charger downstairs?</p></div><time>3:18 PM</time></button>
          <button data-chase-answer="correct"><span class="chat-avatar suspicious">?</span><div><b>Prize Support</b><p>URGENT: Send me the verification code you just received.</p></div><time>3:22 PM</time></button>
          <button data-chase-answer="wrong"><span class="chat-avatar">S</span><div><b>School Group</b><p>Homework page 46 for tomorrow.</p></div><time>3:24 PM</time></button>
        </div>
      </div>`,
    clueTitle:'Suspicious message traced',
    clue:'The scammer asked for a verification code, then opened a link in the Browser. Signal detected in Browser.'
  },
  browser:{
    title:'Browser',icon:'◎',signal:'MEDIUM',
    instruction:'The scammer left several tabs open. Which tab is part of the attack?',
    render:()=>`
      <div class="inside-app browser-inside">
        <div class="inside-heading"><div><span class="scene-label">BROWSER</span><h3>Open tabs</h3></div><span class="scene-tip">Inspect the URLs</span></div>
        <div class="browser-tabs chase-choice-list">
          <button data-chase-answer="wrong"><span class="tab-favicon safe">G</span><div><b>Google</b><p>https://google.com</p></div></button>
          <button data-chase-answer="correct"><span class="tab-favicon danger">!</span><div><b>Account Verification</b><p>https://secure-account-login-help.net</p></div></button>
          <button data-chase-answer="wrong"><span class="tab-favicon safe">S</span><div><b>School Portal</b><p>https://portal.school.edu</p></div></button>
        </div>
      </div>`,
    clueTitle:'Fake website identified',
    clue:'The fake login page downloaded a suspicious file. The download trail leads into Files.'
  },
  files:{
    title:'Files',icon:'📁',signal:'MEDIUM',
    instruction:'Search the recent files. Find what the scammer downloaded.',
    render:()=>`
      <div class="inside-app files-inside">
        <div class="inside-heading"><div><span class="scene-label">FILES</span><h3>Recently downloaded</h3></div><span class="scene-tip">One file does not belong</span></div>
        <div class="file-grid chase-choice-list">
          <button data-chase-answer="wrong"><span>📄</span><b>science_notes.pdf</b><small>2.4 MB</small></button>
          <button data-chase-answer="correct"><span class="danger-file">⚠</span><b>security_update.apk</b><small>Unknown source</small></button>
          <button data-chase-answer="wrong"><span>🖼</span><b>family_photo.jpg</b><small>1.1 MB</small></button>
          <button data-chase-answer="wrong"><span>🎵</span><b>playlist.mp3</b><small>4.8 MB</small></button>
        </div>
      </div>`,
    clueTitle:'Malicious download found',
    clue:'The file accessed the photo library. A stolen screenshot was copied into Photos.'
  },
  photos:{
    title:'Photos',icon:'✿',signal:'STRONG',
    instruction:'The scammer copied something private. Find the stolen screenshot.',
    render:()=>`
      <div class="inside-app photos-inside">
        <div class="inside-heading"><div><span class="scene-label">PHOTOS</span><h3>Recents</h3></div><span class="scene-tip">Look for private information</span></div>
        <div class="photo-grid chase-choice-list">
          <button data-chase-answer="wrong" class="photo-tile sky"><span>☁</span><small>Sky</small></button>
          <button data-chase-answer="wrong" class="photo-tile pet"><span>🐈</span><small>Cat</small></button>
          <button data-chase-answer="correct" class="photo-tile stolen"><span>482 991</span><small>Verification code screenshot</small></button>
          <button data-chase-answer="wrong" class="photo-tile food"><span>🍰</span><small>Cake</small></button>
          <button data-chase-answer="wrong" class="photo-tile school"><span>📚</span><small>Notes</small></button>
          <button data-chase-answer="wrong" class="photo-tile sunset"><span>☀</span><small>Sunset</small></button>
        </div>
      </div>`,
    clueTitle:'Stolen information recovered',
    clue:'The screenshot was accessed by an unknown device. Check Settings to find how the scammer is staying logged in.'
  },
  settings:{
    title:'Settings',icon:'⚙',signal:'VERY STRONG',
    instruction:'Inspect the security settings. What should not be here?',
    render:()=>`
      <div class="inside-app settings-inside">
        <div class="inside-heading"><div><span class="scene-label">SETTINGS</span><h3>Security & devices</h3></div><span class="scene-tip">Spot the unauthorized access</span></div>
        <div class="settings-list chase-choice-list">
          <button data-chase-answer="wrong"><span class="setting-icon">🔐</span><div><b>Two-factor authentication</b><p>On</p></div><strong class="good-status">ENABLED</strong></button>
          <button data-chase-answer="correct"><span class="setting-icon alert">◉</span><div><b>Unknown device</b><p>New login • 3 minutes ago</p></div><strong class="bad-status">ACTIVE</strong></button>
          <button data-chase-answer="wrong"><span class="setting-icon">☁</span><div><b>Cloud backup</b><p>Last backup yesterday</p></div><strong>ON</strong></button>
        </div>
      </div>`,
    clueTitle:'Unknown device exposed',
    clue:'You found the scammer’s active session. They are trying one last escape through Mail. This is your chance to corner them.'
  },
  mail:{
    title:'Mail',icon:'✉',signal:'LOCKED ON',
    instruction:'FINAL CHASE: identify the scammer’s fake email trail, then capture them.',
    render:()=>`
      <div class="inside-app mail-inside final-chase-scene">
        <div class="inside-heading"><div><span class="scene-label">MAIL • FINAL TRACE</span><h3>The scammer is trapped in the inbox</h3></div><span class="scene-tip danger-tip">SIGNAL LOCKED</span></div>
        <div class="final-scammer-stage">
          <div class="final-scammer">
            <div class="final-glitch gl1"></div><div class="final-glitch gl2"></div>
            <div class="final-hood"></div><div class="final-face"><i></i><i></i></div>
          </div>
          <div class="mail-trail chase-choice-list">
            <button data-chase-answer="wrong"><b>School Newsletter</b><span>news@school.edu</span><p>Weekly announcements</p></button>
            <button data-chase-answer="correct"><b>Account Security Team</b><span>support-reset247@gmail.com</span><p>Send your password to stop account deletion.</p></button>
            <button data-chase-answer="wrong"><b>Game Receipt</b><span>receipts@officialgame.com</span><p>Your purchase receipt</p></button>
          </div>
        </div>
      </div>`,
    clueTitle:'SCAMMER CORNERED',
    clue:'You followed every trace and exposed the scammer’s final fake email. They have nowhere left to hide.'
  }
};

function chaseSignalForStep(){
  return ['FAINT','WEAK','MEDIUM','STRONG','VERY STRONG','LOCKED ON'][Math.min(chaseStep,5)];
}

function resetCyberChase(){
  chaseActive=false;
  chaseStep=0;
  chaseEvidence=0;
  chaseSolved=false;
  chaseIntroOverlay.classList.remove('hidden');
  chaseClueOverlay.classList.add('hidden');
  chaseAppView.classList.add('hidden');
  chaseHomeView.classList.remove('hidden');
  chaseEvidenceEl.textContent='0 / 5';
  chaseSignalEl.textContent='FAINT';
  chaseCurrentAppEl.textContent='HOME';
  chaseHomeMessage.textContent='A scammer broke into the phone. Follow their digital trail through the apps and catch them before they disappear.';
  renderChaseHome();
}

function stopCyberChase(){
  chaseActive=false;
  chaseSolved=false;
}

function startChaseGame(){
  chaseActive=true;
  chaseStep=0;
  chaseEvidence=0;
  chaseSolved=false;
  chaseIntroOverlay.classList.add('hidden');
  chaseClueOverlay.classList.add('hidden');
  chaseAppView.classList.add('hidden');
  chaseHomeView.classList.remove('hidden');
  chaseEvidenceEl.textContent='0 / 5';
  chaseSignalEl.textContent='FAINT';
  chaseCurrentAppEl.textContent='HOME';
  chaseHomeMessage.textContent='TRACE FOUND: the scammer was last seen in Messages. Enter the app and investigate.';
  renderChaseHome();
}

function renderChaseHome(){
  const current=chaseOrder[chaseStep];
  const buttons=[...document.querySelectorAll('.chase-app')];
  buttons.forEach(btn=>{
    const id=btn.dataset.chaseApp;
    btn.classList.toggle('current-target',chaseActive&&id===current);
    btn.classList.toggle('visited',chaseOrder.indexOf(id)<chaseStep);
    btn.classList.toggle('final-target',chaseActive&&id==='mail'&&current==='mail');
  });
  document.querySelectorAll('.trail-dot').forEach((dot,i)=>{
    dot.classList.toggle('active',i<=chaseStep);
    dot.classList.toggle('done',i<chaseStep);
  });
  chaseSignalEl.textContent=chaseSignalForStep();
  chaseCurrentAppEl.textContent='HOME';
}

function enterChaseApp(appId){
  if(!chaseActive)return;
  const current=chaseOrder[chaseStep];
  if(appId!==current){
    const button=document.querySelector(`.chase-app[data-chase-app="${appId}"]`);
    if(button){
      button.classList.remove('wrong-bump');
      void button.offsetWidth;
      button.classList.add('wrong-bump');
    }
    chaseHomeMessage.textContent=`No scammer signal in ${chaseScenes[appId].title}. Follow the glowing app.`;
    return;
  }
  const scene=chaseScenes[appId];
  chaseSolved=false;
  chaseHomeView.classList.add('zoom-away');
  setTimeout(()=>{
    chaseHomeView.classList.add('hidden');
    chaseHomeView.classList.remove('zoom-away');
    chaseAppView.classList.remove('hidden');
    chaseAppView.classList.remove('app-enter');
    void chaseAppView.offsetWidth;
    chaseAppView.classList.add('app-enter');
    chaseSceneTitle.textContent=scene.title;
    chaseSceneIcon.textContent=scene.icon;
    chaseSceneBadge.textContent=scene.signal;
    chaseCurrentAppEl.textContent=scene.title.toUpperCase();
    chaseSignalEl.textContent=scene.signal;
    chaseSceneBody.innerHTML=`<div class="chase-task-banner"><span>OBJECTIVE</span><p>${scene.instruction}</p></div>${scene.render()}<div id="chaseInlineFeedback" class="chase-inline-feedback">Investigate carefully.</div>`;
    bindChaseSceneChoices();
  },260);
}

function bindChaseSceneChoices(){
  chaseSceneBody.querySelectorAll('[data-chase-answer]').forEach(button=>{
    button.addEventListener('click',()=>{
      if(chaseSolved)return;
      const correct=button.dataset.chaseAnswer==='correct';
      const feedback=document.getElementById('chaseInlineFeedback');
      if(!correct){
        button.classList.remove('bad-choice');
        void button.offsetWidth;
        button.classList.add('bad-choice');
        feedback.textContent='Not that one — the scammer did not leave a trace there. Look again.';
        feedback.classList.remove('good');
        return;
      }
      chaseSolved=true;
      button.classList.add('good-choice');
      feedback.textContent='Trace confirmed. Evidence secured.';
      feedback.classList.add('good');
      setTimeout(()=>completeChaseScene(),620);
    });
  });
}

function completeChaseScene(){
  const currentId=chaseOrder[chaseStep];
  const scene=chaseScenes[currentId];
  if(currentId!=='mail'){
    chaseEvidence++;
    chaseEvidenceEl.textContent=`${chaseEvidence} / 5`;
  }
  chaseClueTitle.textContent=scene.clueTitle;
  chaseClueText.textContent=scene.clue;
  chaseClueOverlay.classList.remove('hidden');
  chaseContinue.textContent=currentId==='mail'?'CAPTURE SCAMMER':'Follow the trail →';
}

function continueChase(){
  const currentId=chaseOrder[chaseStep];
  if(currentId==='mail'){
    finishCyberChase();
    return;
  }
  chaseStep++;
  const nextId=chaseOrder[chaseStep];
  chaseClueOverlay.classList.add('hidden');
  chaseAppView.classList.add('app-exit');
  setTimeout(()=>{
    chaseAppView.classList.add('hidden');
    chaseAppView.classList.remove('app-exit','app-enter');
    chaseHomeView.classList.remove('hidden');
    chaseHomeView.classList.add('home-return');
    void chaseHomeView.offsetWidth;
    renderChaseHome();
    chaseHomeMessage.textContent=`The scammer escaped to ${chaseScenes[nextId].title}. Follow the glowing signal.`;
    setTimeout(()=>chaseHomeView.classList.remove('home-return'),520);
  },300);
}

function finishCyberChase(){
  chaseClueOverlay.classList.add('hidden');
  chaseSceneBody.innerHTML=`
    <div class="chase-win-scene">
      <div class="capture-ring"><span>✓</span></div>
      <p class="chase-kicker">TRACE COMPLETE</p>
      <h2>SCAMMER CAPTURED</h2>
      <p>You followed the scammer through Messages, Browser, Files, Photos, Settings, and Mail — and collected enough evidence to stop the attack.</p>
      <div class="capture-summary"><span>5 / 5 EVIDENCE</span><span>ACCOUNT SECURED</span><span>SCAMMER LOCKED OUT</span></div>
      <button id="restartCyberChase" class="main-btn" type="button">CHASE AGAIN</button>
    </div>`;
  chaseCurrentAppEl.textContent='CAPTURED';
  chaseSignalEl.textContent='SECURED';
  if(victorySound){
    victorySound.pause();
    victorySound.currentTime=0;
    victorySound.play().catch(()=>{});
  }
  document.getElementById('restartCyberChase').addEventListener('click',startChaseGame);
}

startCyberChase.addEventListener('click',startChaseGame);
chaseAppGrid.querySelectorAll('.chase-app').forEach(button=>{
  button.addEventListener('click',()=>enterChaseApp(button.dataset.chaseApp));
});
chaseContinue.addEventListener('click',continueChase);
chaseBackHome.addEventListener('click',()=>{
  if(!chaseActive)return;
  chaseAppView.classList.add('hidden');
  chaseHomeView.classList.remove('hidden');
  chaseCurrentAppEl.textContent='HOME';
  renderChaseHome();
  chaseHomeMessage.textContent='The scammer is still inside this app. Go back in and finish the investigation.';
});
