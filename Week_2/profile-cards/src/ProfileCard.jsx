export default function ProfileCard({
  photo,
  name,
  age,
  gender,
  height,
  quote,
}) {
  let [src, img_width = 100, img_height = 100] = photo;
  return (
    <>
      <img src={src} alt={name} width={img_width} height={img_height}></img>
      <p>
        <b>Name</b>: {name}
      </p>
      <p>
        <b>Age</b>: {age}
      </p>
      <p>
        <b>Gender</b>: {gender}
      </p>
      <p>
        <b>Height</b>: {height}
      </p>
      <p>
        <b>Quote</b>: {quote}
      </p>
    </>
  );
}
