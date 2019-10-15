const Discord = require('discord.js');
const client = new Discord.Client();

let tracery = require('tracery-grammar');


var grammar = tracery.createGrammar({
  'analysis': ['#verdict#', '#verdict#', '#verdict#', '#verdict#', 'That is more haunted than #punchline#.', 'That is spookier than #punchline#. But not haunted.'],
  'punchline': ['#place# #time#', '#place# #time# with #digit# #creature#'],
  'time': ['at midnight', 'at 12:00 am', 'during the witching hour', 'at 3:37 am', 'at 2am', 'on Halloween night', 'on the winter solstice', 'during the #moon_type# moon'],
  'moon_type': ['full', 'blood', 'harvest'],
  'place': ['a graveyard', 'a kirkyard', 'a boneyard', 'a dark alleyway', 'a ruined castle', 'a condemned building', 'a lichfield', 'trying to play the D&D module "Tomb of Horrors"'],
  'digit': ['four', 'five', 'six', 'twelve', 'thirteen', '13', 'eight hundred'],
  'noise': [ 'all #actioning# #volume#', 'all #actioning#'],
  'ing-about': ['complaining about', 'arguing about', 'debating', 'fighting about', 'bemoaning'],
  'actioning': ['#ing-about# #complaints#', 'arm wrestling', 'discussing politics', 'doing the monster mash'],
  'complaints': ['the weather', 'Brexit', 'the youths', 'butter', 'cosplay', 'student loans'],
  'volume': ['rather loudly', 'rather softly', 'in a foreign language', 'with ugly sweaters', 'in a row', 'at the dinner table', 'around a fireplace'],
  'skeleton_types': ['poodles #noise#', 'cows #noise#', 'sheep #noise#', 'skeletons #noise#', 'skeletons #noise# plus one talking skull bouncing around'],
  'creature': ['zombies #noise#', 'skeletal #skeleton_types#', 'werewolves #noise#', 'vampires #noise#'],
  'verdict': ['#short_punchline#', '#maybe_verdict#', '#positive_verdict#', '#negative_verdict#'],
  'maybe_verdict': ['I give it like a #percent#\% chance.',  'Maybe not all of it but #not_all#', 'I don\'t think so #modifier#', 'that #heged# haunted'],
  'negative_verdict': ['Not today, at least.', 'That is fake.','Nope', 'Nah, you\'re good.'],
  'positive_verdict': ['Yes'],
  // 'verdict': ['I give it like a #percent#\% chance.'],
  'heged': ['could be', 'might be', 'probably is'],
  'comedic_timing': ['Also yes.', 'Who knows.', 'Maybe.', 'Tragically Not.'],
  'percent': ['0', '4', '12', '24', '27', '34', '45', '52', '61', '66', '66.6', '79', '87', '100'],
  'short_punchline': ['Spooky? Yes. Haunted...? #comedic_timing#', '3spoopy5me', 'Quoth the raven: SHIT\'S HAUNTED, YO!', 'It\'s full of HP Lovecraft and the fish people.', 'That would make Edgar Allen Poe lose his shit.', 'Actually YOU were haunted all along', 'Places and things aren\'t haunted, people are. I\'m talking about you. You\'re haunted. And the sooner you get help the sooner we can all move on.'],
  'not_all': ['but definitely some of it.', 'but at least a little.', 'but I still don\'t like it.'],
  'modifier': ['but I\'m not sure so be careful!', 'but you might want to to poke it with a stick first.', 'but you should check it out!', 'but it\'s kinda weird, don\'t you think?', 'but it should be.']
});


// 'client.on('message')' commands are triggered when the
// specified message is read in a text channel that the bot is in.



let parse_message = function(message)
{
  let sentence = message.toString().toLowerCase();
    
  if (sentence.includes('is this ') || sentence.includes('are these ')){
    return true;
  }
}

client.on('message', message => {
  console.log(message.content);
  if (message.content.toString().toLowerCase() === 'ping') {
    message.reply('pong');
  }
  else if (message.isMentioned(client.user) === false){
    return;
  }
  else{
    if (parse_message(message))
    {
      let resp = grammar.flatten('#analysis#')
      message.reply(resp);  
    }
    else {
      message.reply("I didn't understand that. Send me a picture and ask '@ParanormalActivity is this ___ haunted?'");
    }
  } 
});

console.log('Server is online! My username is ' + client.user);
client.login(process.env.SECRET);