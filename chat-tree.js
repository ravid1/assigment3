function ChatTree(element) {
    function load(items) {
        const list = $('.left');
        let flag = true;
        if(!(list.children().length)) {
            for (let item of items) {
                let listItem = $('<li>');
                listItem.text(item.name);
                if(flag){
                    $(listItem).addClass('active');
                    flag = false;
                }
                if (item.type === "group") {
                    listItem.data(item.items);
                }
                list.append(listItem);
            }
        }

        list.click((e)=>{
            changeColor(e.target);
        });

        list.dblclick((e)=>{
            changeColor(e.target);
            let data = $(e.target).data();
            if($(e.target).children().length){
                $(e.target).children().remove();
            }

            else if((Object.keys(data)).length) {
                buildNodes(e.target);
            }
        });
    }

    function buildNodes(element){
        const data = $(element).data();
        const parent =  $('.active').closest('ul');
        let indent = getIndent();
        let ul = $('<ul >');
        $(ul).addClass('noColor');
        console.log($(parent).css('text-indent'));
        $(ul).css('text-indent',(indent));
        for (let key in data) {
            let li = $('<li >');
            li.append(data[key].name);
            if(data[key].type === "group"){
                li.data(data[key].items);
            }
            ul.append(li);
        }
        $('.active').append(ul);
    }

    $('.left').keydown(function(e){
        switch(e.which){
            case 13:
                enterKey();
                break;
            case 37:
                leftKey();
                break;
            case 38:
                upKey();
                break;
            case 39:
                rightKey();
                break;
            case 40:
                downKey();
                break;
        }
        e.preventDefault();
    });

    function enterKey() {
        console.log("ENTER");
        if(!($('.active').children().length) && (Object.keys($('.active').data())).length) {
            buildNodes($('.active'));
        }

        else{
            //leftKey();
            changeColor($('.active'));
            let data = $('.active').data();
            if($('.active').children().length){
                $('.active').children().remove();
            }

            else if((Object.keys(data)).length) {
                buildNodes($('.active'));
            }
        }
    }

    function leftKey(){
        const node = $('.active').parent();
        if(($('.active').children().length)){
            $('.active').children().remove();
        }
        else if(!(node.hasClass('left tree'))){
            changeColor(node.parent());
            node.remove();
        }
    }

    function upKey(){
        let node = $('.active').prev();
        let parent = $('.active').closest('ul');
        if(node.length){
            changeColor(node);
        }
        else if(parent.length && !(parent.hasClass('left tree'))){
            changeColor(parent.closest('li'));
        }
    }

    function rightKey() {
        if(!($('.active').children().length) && (Object.keys($('.active').data())).length) {
            buildNodes($('.active'));
        }
    }

    function downKey(){
        let child = $('.active').children();
        if (child.length) {
            changeColor(child.find('li')[0]);
        }
        else if ($('.active').next().length) {
            let sibling = $('.active').next();
            changeColor(sibling);
        }
    }

    function getIndent(){
        const parent = $('.active').closest('ul');
        let indent = $(parent).css('text-indent');
        indent.substring(0,indent.indexOf('px'));
        indent = parseInt(indent);
        indent+=10;
        return (indent +'px');
    }

    function changeColor(element){
        $('.active').removeClass('active');
        $(element).addClass('active');
    }

    function clear() {
        $('.left').children().remove();
    }

    return {
        load,
        clear,
        element,
    };
}
