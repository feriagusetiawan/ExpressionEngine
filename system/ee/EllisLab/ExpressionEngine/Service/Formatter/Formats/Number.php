<?php
/**
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2017, EllisLab, Inc. (https://ellislab.com)
 * @license   https://expressionengine.com/license
 */

namespace EllisLab\ExpressionEngine\Service\Formatter\Formats;

use EllisLab\ExpressionEngine\Service\Formatter\Formatter;

/**
 * Formatter\Number
 */
class Number extends Formatter {

	/**
	 * Format the memory to a sane byte format
	 *
	 * @param  bool $abbr Use the abbreviated form of the byte format
	 * @param  bool $include_markup Output with <abbr> HTML. Only affects abbreviated forms.
	 * @return self This returns a reference to itself
	 **/
	public function bytes($abbr = TRUE, $include_markup = TRUE)
	{
		$memory = $this->content;
		$precision = 0;

		if ($abbr && $include_markup)
		{
			$lang_suffix = '_abbr_html';
		}
		elseif ($abbr)
		{
			$lang_suffix = '_abbr';
		}
		else
		{
			$lang_suffix = '';
		}

		if ($memory >= 1000000000)
		{
			$precision = 2;
			$memory = round($memory / 1073741824, $precision);
			$unit = lang('formatter_gigabytes'.$lang_suffix);
		}
		elseif ($memory >= 1000000)
		{
			$precision = 1;
			$memory = round($memory / 1048576, $precision);
			$unit = lang('formatter_megabytes'.$lang_suffix);
		}
		elseif ($memory >= 1000)
		{
			$memory = round($memory / 1024);
			$unit = lang('formatter_kilobytes'.$lang_suffix);
		}
		else
		{
			$unit = lang('formatter_bytes'.$lang_suffix);
		}

		$unit = ($abbr) ? $unit : ' '.$unit;
		$this->content = number_format($memory, $precision).$unit;
		return $this;
	}

	/**
	 * Currency Formatter
	 *
	 * Greatest accuracy requires the PHP intl extension to be available
	 *
	 * @param  array  $options (string) currency, (string) locale
	 * @return self This returns a reference to itself
	 */
	public function currency($options = [])
	{
		$options = [
			'currency' => (isset($options['currency'])) ? $options['currency'] : 'USD',
			'locale' => (isset($options['locale'])) ? $options['locale'] : 'en_US.UTF-8',
		];

		// best option, will display the currency correctly based on the locale
		// e.g. $112,358.13 and €112,358.13 in the US; 112.358,13 $ and 112.358,13 € in Germany
		if ($this->intl_loaded)
		{
			$fmt = new \NumberFormatter($options['locale'], \NumberFormatter::CURRENCY);
			$this->content = $fmt->formatCurrency((float) $this->content, $options['currency']);
			return $this;
		}

		// This PHP function is a wrapper for strfmon, so isn't available on all systems, e.g. Windows
		// Won't get the position of the currency marker correct for non-US locales.
		// This is intentionally a 20% effort, 80% solution situation rather than maintaining our own
		// localization formatting lookup tables. The 100% solution is easily achieved by ensuring
		// that the intl extension is loaded in PHP, handled above.
		if (function_exists('money_format'))
		{
			// grab the current monetary locale to reset after formatting
			$sys_locale = setlocale(LC_MONETARY, 0);

			// set the monetary locale to the specified option
			setlocale(LC_MONETARY, $options['locale']);

			$this->content = money_format('%.2n', (float) $this->content);

			// set the monetary locale back to normal
			setlocale(LC_MONETARY, $sys_locale);
			return $this;
		}

		throw new \Exception('<code>{...:currency}</code> modifier error: Environment does not support any known currency formatters, please install the PHP <b>intl</b> extension.');
	}

	/**
	 * Ordinal Formatter
	 *
	 * Locales other than English require the intl extension
	 *
	 * @param  array  $options (string) locale
	 * @return self This returns a reference to itself
	 */
	public function ordinal($options = [])
	{
		$options = [
			'locale' => (isset($options['locale'])) ? $options['locale'] : 'en_US.UTF-8',
		];

		if ($this->intl_loaded)
		{
			$fmt = new \NumberFormatter($options['locale'], \NumberFormatter::ORDINAL);
			$this->content = $fmt->format($this->content);
			return $this;
		}

		// fallback will only work for English ordinal indicators
		$indicators = ['th','st','nd','rd','th','th','th','th','th','th'];

		$mod = $this->content % 100;
		if (($mod >= 11) && ($mod <= 13))
		{
			$indicator = $indicator[0];
		}
		else
		{
			$indicator = $indicators[$this->content % 10];
		}

		$this->content = number_format((float) $this->content).$indicator;
		return $this;
	}
}

// EOF
