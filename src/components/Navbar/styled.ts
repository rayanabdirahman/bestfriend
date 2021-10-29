import styled from 'styled-components';

export const container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 56px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-size: 14px;
`;

export const logo = styled.h1`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  &:after {
    content: '';
    background-color: ${({ theme }) => theme.color.brand};
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 100px;
    margin-left: 2px;
  }
`;

export const menu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  cursor: pointer;
`;

export const menuItem = styled.li`
  text-decoration: none;
  margin-right: 64px;
  a {
    color: ${({ theme }) => theme.color.black};
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.color.brand};
    }
  }

  &:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0;
    background-color: ${({ theme }) => theme.color.black};
    padding: 10px 32px;
    border-radius: 100px;
    height: 24px;

    &:hover {
      background-color: ${({ theme }) => theme.color.brand};
    }

    a {
      color: ${({ theme }) => theme.color.white};
    }
  }
`;
