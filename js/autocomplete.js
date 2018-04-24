$(function() {
	// <select id="select-repo"></select>
	$('.autocomplete').selectize({
		maxItems: null,
		plugins:['remove_button'],
		valueField: 'url',
		labelField: 'name',
		searchField: 'name',
		options: [],
		create: false,
		render: {
			option: function(item, escape) {
				return '<div>' +
					'<span class="title">' +
						'<span class="name"><i class="icon ' + (item.fork ? 'fork' : 'source') + '"></i>' + escape(item.name) + '</span>' +
						'<span class="by">' + escape(item.username) + '</span>' +
					'</span>' +
					'<span class="description">' + escape(item.description) + '</span>' +
					'<ul class="meta">' +
						(item.language ? '<li class="language">' + escape(item.language) + '</li>' : '') +
						'<li class="watchers"><span>' + escape(item.watchers) + '</span> watchers</li>' +
						'<li class="forks"><span>' + escape(item.forks) + '</span> forks</li>' +
					'</ul>' +
				'</div>';
			}
		},
		score: function(search) {
			var score = this.getScoreFunction(search);
			return function(item) {
				return score(item) * (1 + Math.min(item.watchers / 100, 1));
			};
		},
		load: function(query, callback) {
			if (!query.length) return callback();
			$.ajax({
				url: 'https://api.github.com/legacy/repos/search/' + encodeURIComponent(query),
				type: 'GET',
				error: function() {
					callback();
				},
				success: function(res) {
					callback(res.repositories.slice(0, 10));
				}
			});
		}
	});

	
		var $autocomplete = $('.autocomplete');
		// show current input values
		$('select.selectized', $autocomplete).each(function() {
			var $container = $('<div>').addClass('value').html('Current Value: ');
			var $value = $('<span>').appendTo($container);
			var $input = $(this);
			var update = function(e) { $value.text(JSON.stringify($input.val())); }

			$(this).on('change', update);
			update();

			$container.insertAfter($input);
		});
	});
	
