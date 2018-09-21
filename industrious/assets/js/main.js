/*
	Industrious by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/
(function($) {

	var	$window = $(window),
		$banner = $('#banner'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				target: $body,
				visibleClass: 'is-menu-visible',
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right'
			});

})(jQuery);

(function (document, window, undefined) {
  'use strict';

  // Buttons
  var buttons = document.querySelectorAll('.js-button');

  var displayContent = function (button, content) {
    if (content.classList.contains('active')) {
        // Hide content
        content.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');
      } else {
        // Show content
        content.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
      }
  };

  [].forEach.call(buttons, function(button, index) {
    // Content var
    var content = button.nextElementSibling;

    // Set button attributes
    button.setAttribute('id', 'button-' + index);
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'content-' + index);

    // Set content attributes
    content.setAttribute('id', 'content-' + index);
    content.setAttribute('aria-hidden', 'true');
    content.setAttribute('aria-labelledby', 'button-' + index);

    button.addEventListener('click', function () {
      displayContent(this, content);
      return false;
    }, false);

    button.addEventListener('keydown', function (event) {
      // Handle 'space' key
      if (event.which === 32) {
        event.preventDefault();
        displayContent(this, content);
      }
    }, false);

  });

})(document, window);