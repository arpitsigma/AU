<div class="p-page-content p-page-content_tight">
	<div class="c-container">

		<div class="p-page-header__text" style="padding-top: 50px;">
			<h1 class="p-page-header__title"><span style="color: #0075b8;"><?php the_title(); ?></span></h1>
			<?php if ( $description = get_post_meta( get_the_ID(), 'page_description', true ) ): ?>
				<div class="p-page-header__description" style="font-size: 2.85em;">
					<?php echo wpautop( $description ); ?>
				</div>
			<?php endif; ?>
		</div>
		<?php the_content();?>

	</div>
</div>
