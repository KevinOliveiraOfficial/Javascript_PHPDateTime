window.PHPDateTime = window.PHPDateTime || {};
(function()
{
	window.PHPDateTime = function( config = {} )
	{
		var _this = this;
		this.config = config;

		var DateTime = {
			year: undefined,
			month: undefined,
			day: undefined,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
		};

		this.define = ( object ) =>
		{
			DateTime.year = object.year ?? undefined;
			DateTime.month = object.month ?? undefined;
			DateTime.day = object.day ?? undefined;
			DateTime.hour = object.hour ?? 0;
			DateTime.minute = object.minute ?? 0;
			DateTime.second = object.second ?? 0;
			DateTime.millisecond = object.millisecond ?? 0;
		}

		this.getDateTime = () =>
		{
			return DateTime;
		}

		this.createJSDate = () =>
		{
			return new Date( DateTime.year, DateTime.month-1, DateTime.day, DateTime.hour, DateTime.minute, DateTime.second, DateTime.millisecond );
		}

		this.format = ( format ) =>
		{
			let scape = 0;
			let output = "";
			let symbol;
			for ( let i = 0; i < format.length; i++ )
			{
				symbol = format[i];

				if ( symbol === '{' || symbol === '}' )
				{
					scape++;
					continue;
				}
				if ( scape > 0 && scape % 2 !== 0)
				{
					output += format[i];
					continue;
				}
				switch (symbol)
				{
					case "Y":
						output += DateTime.year;
						break;
					case "m":
						output += DateTime.month.toString().padStart(2, '0');
						break;
					case "d":
						output += DateTime.day.toString().padStart(2, '0');
						break;
					case "H":
						output += DateTime.hour.toString().padStart(2, '0');
						break;
					case "i":
						output += DateTime.minute.toString().padStart(2, '0');
						break;
					case "s":
						output += DateTime.second.toString().padStart(2, '0');
						break;
					default:
						output += symbol;
						break;
				}

			}
			return output;
		}

		this.isNumeric = (str) =>
		{
			return /^\d+$/.test(str);
		}

		this.init = () =>
		{
			_this.define( config );
			let datetime = config.datetime ?? undefined;
			let format = config.format ?? undefined;
			let ISO_8601 = config.ISO_8601;
			
			// handle datetime
			if ( datetime !== undefined )
			{
				if ( format === undefined )
					throw "format must be specified when 'date' or 'datetime' is defined";

				let tmp_datetime = datetime;
				let symbol;
				let obj = {};
				for ( let i = 0; i < format.length; i++ )
				{
					symbol = format[i];

					if ( symbol === "Y" )
					{
						obj.year = parseInt(tmp_datetime.substring(0, 4));
						tmp_datetime = tmp_datetime.slice(4);
					}
					else if ( ["m", "d", "H", "i", "s"].includes(symbol) )
					{
						let j;
						let aux = "";
						for ( j = 0; j < tmp_datetime.length; j++ )
						{
							if ( aux.length === 2 )
								break;

							let isNumeric = _this.isNumeric(tmp_datetime[j]);
						
							if ( isNumeric )
								aux += tmp_datetime[j];		
							else if ( aux.length === 1 )
								break;
						}
						tmp_datetime = tmp_datetime.slice(j);
						switch (symbol)
						{
							case "m":
								obj.month = parseInt(aux);
								break;
							case "d":
								obj.day = parseInt(aux);
								break;
							case "H":
								obj.hour = parseInt(aux);
								break;
							case "i":
								obj.minute = parseInt(aux);
								break;
							case "s":
								obj.second = parseInt(aux);
								break;
							default:
								break;
						}
					}
				}
				_this.define( obj );
			}
		};
		this.init();
	}
}
)();