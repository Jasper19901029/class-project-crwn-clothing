import { useNavigate } from "react-router-dom";

// change to styled-components
// import "./directory-item.styles.scss";
import {
  BackgroundImageContainer,
  BodyContainer,
  DirectoryItemContainer,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImageContainer imageUrl={imageUrl} />
      <BodyContainer>
        <h2>{title}</h2>
        <p>SHOP NOW</p>
      </BodyContainer>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
