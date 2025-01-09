import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ name, size = 50, backgroundColor = '#ff8000', textColor = '#FFFFFF', fontSize = 16 }) => {
  // Функция для извлечения инициалов
  const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    const initials = words.map(word => word[0]?.toUpperCase()).slice(0, 2);
    return initials.join('');
  };

  const initials = getInitials(name);

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor,
    color: textColor,
    fontSize,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  };

  return <div className='avatar_letter' style={style}>{initials}</div>;
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.number,
};

export default Avatar;
