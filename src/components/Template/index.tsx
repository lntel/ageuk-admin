import { FC, ReactElement, useContext, useEffect } from "react";
import "./index.scss";

import Navigation from "../Navigation";
import { Topbar } from "../Topbar";
import classNames from "classnames";
import request from "../../helpers/request";
import { AuthContext } from "../../context/AuthContext";

export type TemplateLayout = "grid" | "none";
export interface TemplateProps {
  children?: any;
  header?: string;
  layout?: TemplateLayout;
  headerChildren?: ReactElement<any, any>;
  className?: string;
}

const Template: FC<TemplateProps> = ({
  children,
  header,
  layout = "grid",
  className,
  headerChildren,
}) => {

  const { state: authState, dispatch } = useContext(AuthContext);

  const getCurrentStaff = async () => {
    const response = await request({
      url: "/auth/profile",
      headers: {
        Authorization: `Bearer ${authState.accessToken}`
      }
    });

    if(response.ok) {
      const data = await response.json();

      const permissions = data.role.permissions;

      dispatch({
        type: "SET_PERMISSIONS",
        state: {
          ...authState,
          permissions
        }
      });
    }
  }

  useEffect(() => {
    getCurrentStaff();
  }, []);
  

  return (
    <main className={classNames("template", className)}>
      <Navigation />
      <Topbar />
      <h1 className="template__header">
        {header}
        {headerChildren}
      </h1>
      <div
        className={classNames(
          "template__main",
          layout === "grid" ? "template__main--grid" : null
        )}
      >
        {children}
      </div>
    </main>
  );
};

export default Template;
