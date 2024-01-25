import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import React from "react";

const svgContent = `
<svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle id="Ellipse 17" cx="38" cy="38.3795" r="37.5" fill="#01D6C9"/>
</svg>
`;

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SvgXml xml={svgContent} width="20" height="20" />
    </View>
  );
};

export default App;
