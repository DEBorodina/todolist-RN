import React, { FC } from 'react';

import { Container, SearchIcon, StyledTaskInput } from './styles';
import { TaskInputProps } from './types';

export const TaskInput: FC<TaskInputProps> = () => (
  <Container>
    <SearchIcon name="search-sharp" size={17} color="#888888" />
    <StyledTaskInput placeholder="Search tasks" />
  </Container>
);
