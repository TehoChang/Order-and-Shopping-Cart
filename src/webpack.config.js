module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        // Other settings, like include or exclude
        options: {
          presets: [
            //...
          ],
          plugins: [
            // ...
            // Importing Ant here is not needed if you are using a .babelrc file
            ['import', { 
              "libraryName": "antd",
              "libraryDirectory": "es" // or "lib" for default
              // No "style" setting
            }],
          ]
        },
      },
      // ...
      // Include less-loader (exact settings may deviate depending on your building/bundling procedure)
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { 
            loader: "less-loader",
            options: {
              javascriptEnabled: true //This is important!
            }
          }
        ]
      },
      // Tell the DEFAULT sass-rule to ignore being used for sass imports in less files (sounds weird)
      {
        test: /\.scss$/,
        issuer: {
          exclude: /\.less$/,
        },
        // ... other settings
      },
      // Define a second rule for only being used from less files
      // This rule will only be used for converting our sass-variables to less-variables
      {
        test: /\.scss$/,
        issuer: /\.less$/,
        use: {
          loader: './sassVarsToLess.js' // Change path if necessary
        }
      },
      
      // ...
    ]
  }

