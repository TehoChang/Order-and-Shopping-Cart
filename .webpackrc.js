
const path = require('path');

export default {
  extraBabelPlugins: [
    
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: "css" }]
  ],
  alias: {
    Assets: path.resolve(__dirname, './src/assets')
  },
  theme: {
    "primary-color": "#ed6605" ,
    "link-color": "#ed6605",
    "font-size-base": "21px",
    "processing-color": "#ed6605",
    "background-color-light": "#fff8eb",
    "dropdown-selected-color": "#ed6605",


  },
};
