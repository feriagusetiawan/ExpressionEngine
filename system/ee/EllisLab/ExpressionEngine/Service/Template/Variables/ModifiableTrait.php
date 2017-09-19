<?php
/**
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2017, EllisLab, Inc. (https://ellislab.com)
 * @license   https://expressionengine.com/license
 */

namespace EllisLab\ExpressionEngine\Service\Template\Variables;

/**
 * :modifier variable replacement methods
 *
 * All methods receive:
 * 		mixed ($data) - whatever content is returned by the field
 * 		array ($params) - an array of optional options!
 * 		string ($tagdata) - optional tagdata, used by pair variables
 */
trait ModifiableTrait {

	/**
	 * :attr_safe modifier
	 */
	public function replace_attr_safe($data, $params = array(), $tagdata = FALSE)
	{
		return (string) ee('Format')->make('Text', $data)->attributeSafe($params);
	}

	/**
	 * :censor modifier
	 */
	public function replace_censor($data, $params = array(), $tagdata = FALSE)
	{
		return (string) ee('Format')->make('Text', $data)->censor();
	}

	/**
	 * :currency modifier
	 */
	public function replace_currency($data, $params = array(), $tagdata = FALSE)
	{
		return (string) ee('Format')->make('Number', $data)->currency($params);
	}

	/**
	 * :encrypt modifier
	 */
	public function replace_encrypt($data, $params = array(), $tagdata = FALSE)
	{
		return (string) ee('Format')->make('Text', $data)->encrypt($params);
	}

	/**
	 * :form_prep modifier
	 */
	public function replace_form_prep($data, $params = array(), $tagdata = FALSE)
	{
		return (string) ee('Format')->make('Text', $data)->formPrep()->encodeEETags($params);
	}

	/**
	 * :json modifier
	 */
	public function replace_json($data, $params = array(), $tagdata = FALSE)
	{
		return (string) ee('Format')->make('Text', $data)->json($params);
	}

	/**
	 * :length modifier
	 */
	public function replace_length($data, $params = array(), $tagdata = FALSE)
	{
		return (string) ee('Format')->make('Text', $data)->getLength();
	}

	/**
	 * :limit modifier
	 */
	public function replace_limit($data, $params = array(), $tagdata = FALSE)
	{
		return (string) ee('Format')->make('Text', $data)->limitChars($params);
	}

	/**
	 * :raw_content modifier
	 */
	public function replace_raw_content($data, $params = array(), $tagdata = FALSE)
	{
		return (string) ee('Format')->make('Text', $data)->encodeEETags($params);
	}

	/**
	 * :replace modifier
	 */
	public function replace_replace($data, $params = array(), $tagdata = FALSE)
	{
		return (string) ee('Format')->make('Text', $data)->replace($params);
	}

	/**
	 * :rot13 modifier (for Seth)
	 */
	public function replace_rot13($data, $params = array(), $tagdata = FALSE)
	{
		return str_rot13($data);
	}

	/**
	 * :url_decode modifier
	 */
	public function replace_url_decode($data, $params = array(), $tagdata = FALSE)
	{
		return (string) ee('Format')->make('Text', $data)->urlDecode($params);
	}

	/**
	 * :url_encode modifier
	 */
	public function replace_url_encode($data, $params = array(), $tagdata = FALSE)
	{
		return (string) ee('Format')->make('Text', $data)->urlEncode($params);
	}

	/**
	 * :url_slug modifier
	 */
	public function replace_url_slug($data, $params = array(), $tagdata = FALSE)
	{
		return (string) ee('Format')->make('Text', $data)->urlSlug($params);
	}
}
// END TRAIT

// EOF
