import styled from "styled-components";

const IMAGES = [
  "st-001.jpg",
  "st-002.jpg",
  "st-049.jpg",
  "st-059.jpg",
  "st-166.jpg",
  "bo-080.jpg",
  "digimon-background.jpeg",
];

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://mfa-practice-edu.vercel.app/";
export const Cards = () => {
  return (
    <CardsLayout>
      {IMAGES.map((image, i) => (
        <img key={i} src={`${URL}/assets/cards/${image}`} alt={image} />
      ))}
    </CardsLayout>
  );
};

const CardsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;
