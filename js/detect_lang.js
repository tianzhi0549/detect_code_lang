(function()
{
	function array_to_obj(array)
	{
		var obj={};
		for(var i in array)
		{
			 obj[array[i]]=null;
		}
		return obj;
	}
	for(var lang in g_features)
	{
		g_features[lang]=array_to_obj(g_features[lang]);
	}
})();
function detect_lang(code)
{
	var words=null;
	code=code.replace(/"[\s\S]+?"/g,'""');
	code=code.replace(/'[\s\S]+?'/g,"''");
	code=code.replace(/\/\*[\s\S]+?\*\//g,"/**/");
	code=code.replace(/\/\/.+/g,"//");
	code=code.replace(/;.+/g,";");
	code=code.replace(/'.+/g,"'");
	words=code.match(/(\b[a-z_][a-z0-9_]*\b|[\#\$\{\}\;\:\[\]]|\/\*|\*\/|\/\/)/ig);
	var max_count=-1,cur_count=0;
	var detected_lang="";
	for(var lang in g_features)
	{
		cur_count=0;
		for(var i in words)
		{
			var tmp=words[i];
			if(lang in g_case_insensitive_langs) tmp=tmp.lowercase();
			if(tmp in g_features[lang])
			{
				cur_count++;
			}
		}
		if(cur_count>max_count)
		{
			max_count=cur_count;
			detected_lang=lang;
		}
	}
	return detected_lang;
}
