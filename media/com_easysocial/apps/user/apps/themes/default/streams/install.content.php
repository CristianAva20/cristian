<?php
/**
* @package		EasySocial
* @copyright	Copyright (C) 2010 - 2013 Stack Ideas Sdn Bhd. All rights reserved.
* @license		GNU/GPL, see LICENSE.php
* EasySocial is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/
defined( '_JEXEC' ) or die( 'Unauthorized Access' );
?>
<div class="row-fluid mb-10 mt-10">
	<div class="span3 text-center">
		<img src="<?php echo $app->getIcon( SOCIAL_APPS_ICON_LARGE );?>" />
	</div>

	<div class="span9">
		<div class="app-title">
			<b><?php echo $app->get( 'title' );?></b>
		</div>
		<div class="small">
			<?php echo $app->getMeta()->version; ?>
		</div>

		<div class="mb-20 mt-20 app-description"><?php echo JText::_( $app->getUserDesc() ); ?></div>

		<?php if( !$installed ){ ?>
		<div class="mt-20">
			<a href="javascript:void(0);" class="btn btn-es-primary" data-install-app-<?php echo $uid; ?> data-id="<?php echo $app->id; ?>"><?php echo JText::_( 'APP_APPS_INSTALL_APPLICATION' ); ?></a>
		</div>
		<?php } ?>
	</div>
</div>
