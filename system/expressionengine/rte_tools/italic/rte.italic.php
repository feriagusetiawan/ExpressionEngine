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
 File: rte.italic.php
-----------------------------------------------------
 Purpose: Italic RTE Tool
=====================================================

*/

$rte_tool_info = array(
	'rte_name'			=> 'Italic',
	'rte_version'		=> '1.0',
	'rte_author'		=> 'Aaron Gustafson',
	'rte_author_url'	=> 'http://easy-designs.net/',
	'rte_description'	=> 'Italicizes and de-italicizes text',
	'rte_definition'	=> Italic_rte::definition()
);

Class Italic_rte {

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
		
		// any other initialization stuff can go here and can be made available in the definition
		$this->EE->lang->loadfile('rte');
		$this->globals = array(
			'rte.italics.add'		=> lang('make_italics'),
			'rte.italics.remove'	=> lang('remove_italics')
		);
	}

	function definition()
	{
		ob_start(); ?>
		
		toolbar.addButton({
			name:			'italic',
			label:			EE.rte.italics.add,
			'toggle-text':	EE.rte.italics.remove
		});
		
<?php	$buffer = ob_get_contents();
		ob_end_clean(); 
		return $buffer;
	}

} // END Italic_rte

/* End of file rte.italic.php */
/* Location: ./system/expressionengine/rte_tools/italic/rte.italic.php */