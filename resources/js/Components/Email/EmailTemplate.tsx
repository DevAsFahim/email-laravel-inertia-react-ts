import { FormEvent, FormEventHandler, useState } from 'react';
import { BlockManager, BasicType, AdvancedType, JsonToMjml } from 'easy-email-core';
import { EmailEditor, EmailEditorProvider, IEmailTemplate } from 'easy-email-editor';
import { ExtensionProps, StandardLayout } from 'easy-email-extensions';
import { useWindowSize } from 'react-use';
import mjml from 'mjml-browser';
import './EmailTemplate.css'

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

// theme, If you need to change the theme, you can make a duplicate in https://arco.design/themes/design/1799/setting/base/Color
import '@arco-themes/react-easy-email-theme/css/arco.css';
import { Router } from 'ziggy-js';
import { router } from '@inertiajs/react';

const categories: ExtensionProps['categories'] = [
  {
    label: 'Content',
    active: true,
    blocks: [
      {
        type: AdvancedType.TEXT,
      },
      {
        type: AdvancedType.IMAGE,
        payload: { attributes: { padding: '0px 0px 0px 0px' } },
      },
      {
        type: AdvancedType.ACCORDION,
        payload: { attributes: { padding: '0px 0px 0px 0px' } },
      },
      {
        type: AdvancedType.CAROUSEL,
        payload: { attributes: { padding: '0px 0px 0px 0px' } },
      },
      {
        type: AdvancedType.BUTTON,
      },
      {
        type: AdvancedType.SOCIAL,
      },
      {
        type: AdvancedType.DIVIDER,
      },
      {
        type: AdvancedType.SPACER,
      },
      {
        type: AdvancedType.HERO,
      },
      {
        type: AdvancedType.WRAPPER,
      },
    ],
  },
  {
    label: 'Layout',
    active: true,
    displayType: 'column',
    blocks: [
      {
        title: '2 columns',
        payload: [
          ['50%', '50%'],
          ['33%', '67%'],
          ['67%', '33%'],
          ['25%', '75%'],
          ['75%', '25%'],
        ],
      },
      {
        title: '3 columns',
        payload: [
          ['33.33%', '33.33%', '33.33%'],
          ['25%', '25%', '50%'],
          ['50%', '25%', '25%'],
        ],
      },
      {
        title: '4 columns',
        payload: [['25%', '25%', '25%', '25%']],
      },
    ],
  },
];


const initialValues = {
  subject: 'Welcome to Easy-email',
  subTitle: 'Nice to meet you!',
  content: BlockManager.getBlockByType(BasicType.PAGE)!.create({}),
};

function pushEvent(params: {
  event: string;
  payload?: Record<string, any>;
}) {
  const dataLayer = (window as any).dataLayer as any[];
  if (!dataLayer) return;

  dataLayer.push({
    event: params.event,
    payload: params.payload,
  });
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    alert('Text copied to clipboard');
  } catch (error) {
    alert('Failed to copy text: ');
  }
}

const onExportHtml = (values: IEmailTemplate) => {
  pushEvent({ event: 'HtmlExport' });
  const html = mjml(
    JsonToMjml({
      data: values.content,
      mode: 'production',
      context: values.content,
    }),
    {
      beautify: true,
      validationLevel: 'soft',
    },
  ).html;

  copy(html);
  alert('Copied to pasteboard!');
};


// const [values, setValues] = useState({
//   name: "",
// })

// const handleChange = (e: FormEvent) => {
//   const key = e.target;
//   const value = (e.target).value;
//   // setValues(values => ({
//   //     ...values,
//   //     [key]: value,
//   // }))
//   console.log(value)
// }


const saveName = {
  name: 'fahim',
}

const handleSubmit = () => {
  router.post(route('data-add'), saveName);
};

// const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = data => {
//     Inertia.post('/inputs', data);
//   };

export default function EmailTemplate() {
  const { width } = useWindowSize();

  const smallScene = width < 1400;

  return (
    <>
    {/* <button type="button" className='bg-green-400 px-[30px] py-[10px] text-white' onClick={handleSubmit}>Submit Name</button> */}
    {/* <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Value:</label>
        <input {...register('value', { required: true, maxLength: 255 })} />
        {errors.value && <span>This field is required.</span>}
      </div>
      <button type="submit">Submit</button>
    </form> */}
      <EmailEditorProvider
        data={initialValues}
        height={'calc(100vh - 72px)'}
        autoComplete
        dashed={false}
      >
        {({ values }) => {
          return (
            <>

              <header className='m-5'>
                <button onClick={() => onExportHtml(values)} className='bg-blue-600 px-7 py-3 rounded-md text-white'>Copy HTML</button>
                <button className='bg-green-500 px-7 py-3 ml-3 rounded-md text-white' onClick={handleSubmit}>Save</button>
              </header>

              <StandardLayout
                compact={!smallScene}
                categories={categories}
                showSourceCode={true}
              >
                <EmailEditor />
              </StandardLayout>
            </>
          );
        }}
      </EmailEditorProvider>
    </>
  );
}

