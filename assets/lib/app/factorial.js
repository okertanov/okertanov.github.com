/**
    @file       factorial.js
    @brief      Scheme language primer

    @author     Oleg Kertanov <okertanov@gmail.com>
    @date       April 2012
    @copyright  Copyright (C) 2012 Oleg Kertanov <okertanov@gmail.com>
    @license    BSD
    @see        LICENSE file
*/

//
// IIFE
//
(function()
{

// Strict mode by default
"use strict";

// jQuery-like Ready
$(function() {
    $('#definition-0').on('mouseenter', function(){
        $('#definition-0 .obscure').removeClass('yes');
    }).on('mouseleave', function(){
        $('#definition-0 .obscure').addClass('yes');
    });

    $('#definition-1').on('mouseenter', function(){
        $('#definition-1 .obscure').removeClass('yes');
    }).on('mouseleave', function(){
        $('#definition-1 .obscure').addClass('yes');
    });

    $('.descr-i').hover(function(){
        $(this).addClass("highlight");
        $(this).data('for').split(' ').map(function(d){
            $('#' + d).addClass("highlight");
        });
    }, function(){
        $(this).removeClass("highlight");
        $(this).data('for').split(' ').map(function(d){
            $('#' + d).removeClass("highlight");
        });
    });
});

})();

