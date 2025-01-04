import PropTypes from "prop-types";

export default function Line(props) {
  return (
    <tr>
      <th>{props.id}</th>
      <th>{props.uniqKey}</th>
      <th>{props.issuer}</th>
      <th>{props.recipient}</th>
      <th>{props.value}</th>
    </tr>
  );
}

Line.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  uniqKey: PropTypes.oneOfType([PropTypes.string]).isRequired,
  issuer: PropTypes.oneOfType([PropTypes.string]).isRequired,
  recipient: PropTypes.oneOfType([PropTypes.string]).isRequired,
  value: PropTypes.oneOfType([PropTypes.number]).isRequired,
};
