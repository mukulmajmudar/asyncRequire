window.asyncRequire = function(targets, options)
{
    'use strict';

    options = Object.assign(
    {
        timeout: 45000
    }, options);

    return new Promise((resolve, reject) =>
    {
        let required = false;
        if (!Array.isArray(targets))
        {
            targets = [targets];
        }
        require(targets, function(...args)
        {
            required = true;
            if (args.length === 1)
            {
                resolve(args[0]);
            }
            else
            {
                resolve(args);
            }
        });

        setTimeout(() =>
        {
            if (!required)
            {
                reject(new asyncRequire.Error());
            }
        }, options.timeout);
    });
};
asyncRequire.Error = class extends Error {};
