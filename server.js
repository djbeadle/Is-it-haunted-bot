const Discord = require('discord.js');
const client = new Discord.Client();

let tracery = require('tracery-grammar');

var bad_question = tracery.createGrammar({
  'base': ["That's not really a question, is it.", "I'm not qualified to offer an opinion on that.", ":shrug:"]
})

var grammar = tracery.createGrammar({
  // Two verdicts for every long_verdict
  'analysis': ['#verdict#', '#verdict#', '#long_verdict#'],
  
  // The different verdicts
  'verdict': ['#maybe_verdict#', '#positive_verdict#', '#negative_verdict#'],
  'negative_verdict': ['No.', 'Not today, at least.', 'That is fake.','Nope', 'Nah, you\'re good.'],
  'positive_verdict': ['Yes.', 'Definitely!', 'Totally haunted.', 'S P O O K E D\nP\nO\nO\nK\nE\nD'],
  
  'maybe_verdict': ['I give it like a #percent#\% chance.',  'Maybe not all of it but #not_all#', 'I don\'t think so #modifier#', 'that #heged# haunted'],
  'modifier': ['but I\'m not sure so be careful!', 'but you might want to to poke it with a stick first.', 'but you should check it out!', 'but it\'s kinda weird, don\'t you think?', 'but it should be.'],
  'heged': ['could be', 'might be', 'probably is'],
  'percent': ['0', '4', '12', '24', '27', '34', '45', '52', '61', '66', '66.6', '79', '87', '100'],
  'not_all': ['definitely some of it.', 'at least a little.', 'I still don\'t like it.'],
  
  // Analysis -> long_verdict
  'long_verdict': ['#short_punchline#', '#short_punchline#', 'That is spookier than #punchline#. But not haunted.', 'That is more haunted than #punchline#.'],
  'punchline': ['#place# #time#', '#place# #time# with #number_of# #creature#'],
  
  // long_verdict -> short_punchline
  'short_punchline': ['Spooky? Yes. Haunted...? #comedic_timing#', '3spoopy5me', 'Quoth the raven: SHIT\'S HAUNTED, YO!', 'It\'s full of HP Lovecraft and the fish people.', 'That would make Edgar Allen Poe lose his shit.', 'Actually YOU were haunted all along', 'Places and things aren\'t haunted, people are. I\'m talking about you. You\'re haunted. And the sooner you get help the sooner we can all move on.'],
  'comedic_timing': ['Also yes.', 'Who knows.', 'Tragically Not.'],
  
  // Punchline -> place & time
  'place': ['a graveyard', 'a kirkyard', 'a boneyard', 'a dark alleyway', 'a ruined castle', 'a condemned building', 'a lichfield', 'trying to play the D&D module "Tomb of Horrors"'],
  'time': ['#clock_time#', 'at midnight #midnight_type#', 'during the witching hour', 'on Halloween night', 'on the winter solstice', 'during the #moon_type# moon'],
  'midnight_type': ['', 'during the #moon_type# moon'],
  'clock_time': ['at 3:37am', 'at 2am', 'at 2:30 in the afternoon'],
  'moon_type': ['full', 'blood', 'harvest'],
  
  // Punchline -> number_of & creatures
  'number_of': ['four', 'five', 'six', 'twelve', 'thirteen', '13', 'seven hundred and fourty three'],
  'creature': ['zombies #noise#', 'skeletal #skeleton_types#', 'werewolves #noise#', 'vampires #noise#'],
  'skeleton_types': ['poodles #noise#', 'cows #noise#', 'sheep #noise#', 'skeletons #noise#', 'skeletons #noise# plus one talking skull bouncing around'],
  'noise': [ 'all #actioning# #volume#', 'all #actioning#'],
  'actioning': ['#ing_about# #discussion_topics#', 'arm wrestling', 'discussing politics', 'doing the monster mash'],
  'volume': ['rather loudly', 'softly', 'in a foreign language', 'with ugly sweaters', 'in a row', 'at the dinner table', 'around a fireplace'],
  
  // Actioning -> ing-about & discussion_topics
  'ing_about': ['complaining about', 'arguing about', 'debating', 'fighting about', 'bemoaning'],
  'discussion_topics': ['the weather', 'Brexit', 'the youths', 'butter', 'cosplay', 'student loans'],
});

var grammar2 = tracery.createGrammar({
   'analysis': ['HELL YES IT IS!', 'YOU KNOW IT!', 'DEFINITELY.', '100%', 'WITH. OUT. A. DOUBT.', 'IT\'S HALOWEEN, #gender# EVERYTHING IS HAUNTED TONIGHT!'],
   'gender': ['BABY', 'DUDE', 'MY SPOOKY AFICIONADO', 'MY GHOSTLY PAL', 'MY COSPLAYING FRIEND']
});

var grammar2 = tracery.createGrammar({
    'analysis': ['❌ #spooky_emoji# ✅ #positive_emoji#', '#punchline#'],
    'punchline': ['Nothing is haunted during the turkey month.', 'I\'m on my break, can this wait#second#?', 'The only spooky thing this month is how much #food# I\'m going to #action#.'],
    'second': [' until October, 2020', ' until the Christmas ghosts appear'],
    'food': ['gravy', 'turkey', 'stuffing', 'bread rolls', 'pie'],
    'action': ['eat', 'stuff in my face', 'consume', 'devour'],
    'spooky_emoji': ['🧛‍♂️', '🧛‍♀️', '🧟‍♂️', '🧟‍♀️', '👻'],
    'positive_emoji': ['🦃#c_end#', '🍗#c_end#'],
    'c_end': ['#positive_emoji#', '#positive_emoji#', '']
})
// 'client.on('message')' commands are triggered when the
// specified message is read in a text channel that the bot is in.



let parse_message = function(message)
{
  let sentence = message.toString().toLowerCase();
    
  /* if (sentence.includes('is this ') || sentence.includes('are these ')){
    return true;
  }*/
  if (sentence.includes('?')){
    return true;
  }
  else{
    return false;
  }
}

// Process messages that come in
client.on('message', message => {
  console.log(message.content);
  // Ping pong
  if (message.content.toString().toLowerCase() === 'ping') {
    message.reply('pong');
  }
  // If the bot was NOT mentioned in this message
  else if (message.isMentioned(client.user) === false){
    return
  }
  // If the bot WAS mentioned in this message.
  else{
    if (parse_message(message))
    {
      let resp = grammar2.flatten('#analysis#')
      message.reply(resp);  
    }
    else {
      message.reply(bad_question.flatten('#base#'));
      // message.reply("I didn't understand that. Send me a picture and ask '@ParanormalActivity is this ___ haunted?'");
    }
  } 
});

console.log('Server is online! My username is ' + client.user);
client.login(process.env.SECRET);