// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Chats = new Meteor.Collection("chats");

if (Meteor.isClient) {

    Template.rachem.events({
        "submit form": function (e,t) {
            e.preventDefault();
            var newtext = $("#newtext").val();
            if (newtext == "") { return; }
            var from = $("#from").val(); 
            if (from == "") { return; }
            //console.log(Chats.find().count() + " chats so far");
            // Insert in the chat collection
            date = new Date();
            Chats.insert({
                from: from,
                text: newtext,
                time: date.getTime()
            });
            // reset input box
            $("#newtext").val("").focus();
            return;
        }
    });

    Template.rachem.chats = function(){
        //return Chats.find({});
        return Chats.find({}, {sort: {time: -1}, limit: 20});
    };
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Chats.find().count() === 0) {
        }
        console.log("about to remove all chats")
        Chats.remove({});
    });
}
