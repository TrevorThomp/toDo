import React from "react";
import Header from "../header";

import Enzyme, { mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe("<Header /> component", () => {
  it("should render as expected", () => {
    const head = shallow(<Header />);
    expect(head.find("header").exists()).toBeTruthy();
  });
});
