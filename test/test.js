import { runTests } from '@bablr/test-runner';
import { spam } from '@bablr/boot';
import { dedent } from '@qnighy/dedent';
import * as language from '@bablr/language-json';

export const testCases = [
  {
    matcher: spam`<Expression>`,
    sourceText: '"hello"',
    parsed: dedent`\
      <>
        children[]:
        <String>
          open:
          <Punctuator balanced='"' lexicalSpan='String'>
            '"'
          </>
          content:
          <StringContent>
            'hello'
          </>
          close:
          <Punctuator balancer>
            '"'
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Expression>`,
    sourceText: '""',
    parsed: dedent`\
      <>
        children[]:
        <String>
          open:
          <Punctuator balanced='"' lexicalSpan='String'>
            '"'
          </>
          content:
          null
          close:
          <Punctuator balancer>
            '"'
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Expression>`,
    sourceText: '" "',
    parsed: dedent`\
      <>
        children[]:
        <String>
          open:
          <Punctuator balanced='"' lexicalSpan='String'>
            '"'
          </>
          content:
          <StringContent>
            ' '
          </>
          close:
          <Punctuator balancer>
            '"'
          </>
        </>
      </>`,
  },
  {
    skip: true,
    matcher: spam`<Expression>`,
    sourceText: ' " " ',
    parsed: dedent`\
      <>
        #' '
        children[]:
        <String>
          open:
          <Punctuator balanced='"' lexicalSpan='String'>
            '"'
          </>
          content:
          <StringContent>
            ' '
          </>
          close:
          <Punctuator balancer>
            '"'
          </>
        </>
        #' '
      </>`,
  },
  {
    matcher: spam`<Expression>`,
    sourceText: '"\\n"',
    parsed: dedent`\
      <>
        children[]:
        <String>
          open:
          <Punctuator balanced='"' lexicalSpan='String'>
            '"'
          </>
          content:
          <StringContent>
            !'${'\\\\n'}' :'${'\\n'}'
          </>
          close:
          <Punctuator balancer>
            '"'
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Expression>`,
    sourceText: 'true',
    parsed: dedent`\
      <>
        children[]:
        <Boolean>
          value:
          <Keyword>
            'true'
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Expression>`,
    sourceText: '1',
    parsed: dedent`\
      <>
        children[]:
        <Number span='Number'>
          wholePart:
          <Integer>
            sign:
            null
            digits[]:
            <Digit>
              '1'
            </>
          </>
          fractionalSeparator:
          null
          fractionalPart:
          null
          exponentSeparator:
          null
          exponentPart:
          null
        </>
      </>`,
  },
  {
    matcher: spam`<Expression>`,
    sourceText: 'null',
    parsed: dedent`\
      <>
        children[]:
        <Null>
          value:
          <Keyword>
            'null'
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Expression>`,
    sourceText: '[]',
    parsed: dedent`\
      <>
        children[]:
        <Array>
          open:
          <Punctuator balanced=']'>
            '['
          </>
          elements[]:
          null
          separators[]:
          null
          close:
          <Punctuator balancer>
            ']'
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Expression>`,
    sourceText: '[null]',
    parsed: dedent`\
      <>
        children[]:
        <Array>
          open:
          <Punctuator balanced=']'>
            '['
          </>
          elements[]:
          <Null>
            value:
            <Keyword>
              'null'
            </>
          </>
          close:
          <Punctuator balancer>
            ']'
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Expression>`,
    sourceText: '21',
    parsed: dedent`\
      <>
        children[]:
        <Number span='Number'>
          wholePart:
          <Integer>
            sign:
            null
            digits[]:
            <Digit>
              '2'
            </>
            digits[]:
            <Digit>
              '1'
            </>
          </>
          fractionalSeparator:
          null
          fractionalPart:
          null
          exponentSeparator:
          null
          exponentPart:
          null
        </>
      </>`,
  },
  {
    matcher: spam`<Expression>`,
    sourceText: '[true, false]',
    parsed: dedent`\
      <>
        children[]:
        <Array>
          open:
          <Punctuator balanced=']'>
            '['
          </>
          elements[]:
          <Boolean>
            value:
            <Keyword>
              'true'
            </>
          </>
          separators[]:
          <Punctuator>
            ','
          </>
          #' '
          elements[]:
          <Boolean>
            value:
            <Keyword>
              'false'
            </>
          </>
          close:
          <Punctuator balancer>
            ']'
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Expression>`,
    sourceText: '{"foo":null}',
    parsed: dedent`\
      <>
        children[]:
        <Object>
          open:
          <Punctuator balanced='}'>
            '{'
          </>
          properties[]:
          <Property>
            key:
            <String>
              open:
              <Punctuator balanced='"' lexicalSpan='String'>
                '"'
              </>
              content:
              <StringContent>
                'foo'
              </>
              close:
              <Punctuator balancer>
                '"'
              </>
            </>
            mapOperator:
            <Punctuator>
              ':'
            </>
            value:
            <Null>
              value:
              <Keyword>
                'null'
              </>
            </>
          </>
          close:
          <Punctuator balancer>
            '}'
          </>
        </>
      </>`,
  },
];

runTests(language, testCases);
