import { useRef } from 'react';
import styled from 'styled-components';
import { Button, Input } from 'components/form';
import { useRouter } from 'next/router';

const StyledForm = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
  margin: ${({ theme }) => theme.space[2]} 0;
`;

interface SearchFormProps {
  nameQueryParam: string;
}

export default function SearchForm({ nameQueryParam }: SearchFormProps) {
  const router = useRouter();
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    if (nameInputRef.current == null) return;

    router.push({
      query: {
        [nameQueryParam]: nameInputRef.current.value,
      },
    });
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <label>
        <span>Search by name: </span>
        <Input
          ref={nameInputRef}
          name={nameQueryParam}
          placeholder="Search by name"
          defaultValue={router.query[nameQueryParam]}
        />
      </label>
      <Button type="submit">Search</Button>
    </StyledForm>
  );
}
