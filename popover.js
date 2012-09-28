$(function() {
	$("#example tbody tr").each(function(){
		var me = $(this);
		$(this).children().each(function(){
			$(this).tipsy({
				fallback: me.data('content'),
				html: true,
				gravity: $.fn.tipsy.autoNS
			});
			console.log($(this))
		});
	});
});