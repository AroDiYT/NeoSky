"use strict"

module.exports = {
	BrowserLogger : require('./BrowserLogger.js'),
	CreateMappingConfig : require('./CreateMappingConfig.js'),
	ExitHandler : require('./ExitHandler.js'),
	FormatHelp : require('./FormatHelp.js'),
	GetConfigValues : require('./GetConfigValues.js'),
	Helper : require('./Helper.js'),
	SbEvent : require('./SbEvent.js'),
	Logger : function(name) {
		return require('./Logger.js')(name);
		},
	Base : require('./Base.js'),
	SingleLetterAbbreviations : require('./SingleLetterAbbreviations.js'),
	Stopwords : require('./Stopwords.js')
}
