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
<dialog>
	<width>600</width>
	<height>650</height>
	<selectors type="json">
	{
		<?php if( $user->isViewer() ){ ?>
		"{deleteButton}"	: "[data-delete-button]",
		"{editButton}"		: "[data-edit-button]",
		<?php } else { ?>
		"{viewButton}"		: "[data-view-button]",
		<?php } ?>

		"{cancelButton}"	: "[data-cancel-button]"
	}
	</selectors>
	<bindings type="javascript">
	{
		"{cancelButton} click": function()
		{
			this.parent.close();
		}
	}
	</bindings>
	<title><?php echo $calendar->get('title');?></title>
	<content>
		<h2><?php echo $calendar->get( 'title' ); ?></h2>
		<div class="event-time" style="color: #ccc;">
			<?php echo $calendar->getStartDate()->format( 'jS M, Y g:iA' );?> - <?php echo $calendar->getEndDate()->format( 'jS M, Y g:iA' );?>
		</div>
		<hr />

		<p class="mt-20"><?php echo $calendar->get( 'description' ); ?></p>
	</content>
	<buttons>
		<?php if( $user->isViewer() ){ ?>
		<div class="pull-left">
			<button data-delete-button type="button" class="btn btn-es-danger"><?php echo JText::_( 'COM_EASYSOCIAL_DELETE_BUTTON' ); ?></button>
		</div>


		<div class="pull-right">
			<button data-cancel-button type="button" class="btn btn-es"><?php echo JText::_( 'COM_EASYSOCIAL_CLOSE_BUTTON' ); ?></button>
			<button data-edit-button type="button" class="btn btn-es-primary"><?php echo JText::_( 'APP_CALENDAR_EDIT_BUTTON' ); ?></button>
		</div>
		<?php } else { ?>
		<div class="pull-right">
			<button data-cancel-button type="button" class="btn btn-es"><?php echo JText::_( 'COM_EASYSOCIAL_CLOSE_BUTTON' ); ?></button>
			<a href="<?php echo FRoute::apps( array( 'layout' => 'canvas' , 'id' => $app->id , 'userid' => $user->getAlias() , 'customView' => 'item' , 'schedule_id' => $calendar->id ) , false );?>" class="btn btn-es-primary"><?php echo JText::_( 'APP_CALENDAR_VIEW_BUTTON' ); ?></a>
		</div>
		<?php } ?>
	</buttons>
</dialog>
