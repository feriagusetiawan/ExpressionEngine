<?php

/*
=====================================================
 ExpressionEngine - by EllisLab
-----------------------------------------------------
 http://expressionengine.com/
-----------------------------------------------------
 Copyright (c) 2004 - 2011 EllisLab, Inc.
=====================================================
 THIS IS COPYRIGHTED SOFTWARE
 PLEASE READ THE LICENSE AGREEMENT
 http://expressionengine.com/user_guide/license.html
=====================================================
 File: rte.strip_tags.php
-----------------------------------------------------
 Purpose: Strip Tags RTE Tool
=====================================================

*/

$rte_tool_info = array(
	'rte_name'			=> 'Strip Tags',
	'rte_version'		=> '1.0',
	'rte_author'		=> 'Aaron Gustafson',
	'rte_author_url'	=> 'http://easy-designs.net/',
	'rte_description'	=> 'Triggers the RTE to strip all block and phrase-level formatting elements',
	'rte_definition'	=> Strip_tags_rte::definition()
);

Class Strip_tags_rte {
	
	private $EE;
	
	public $globals = array();
	public $scripts	= array();
	public $styles	= null;
	
	/** -------------------------------------
	/**  Constructor
	/** -------------------------------------*/
	function __construct()
	{
		// Make a local reference of the ExpressionEngine super object
		$this->EE =& get_instance();
		
		// Anything else we need?
		$this->EE->lang->loadfile('rte');
		$this->globals = array(
			'rte.strip_tags.label' => lang('strip_tags')
		);
	}

	function definition()
	{
		ob_start(); ?>
		
		toolbar.addButton({
			name:	"strip_tags",
			label:	EE.rte.strip_tags.label,
			handler: function( $ed ){
				$ed.stripFormattingElements();
				$ed.unformatContentBlock();
			}
		});
		
<?php	$buffer = ob_get_contents();
		ob_end_clean(); 
		return $buffer;
	}

} // END Strip_tags_rte

/* End of file rte.strip_tags.php */
/* Location: ./system/expressionengine/rte_tools/strip_tags/rte.strip_tags.php */