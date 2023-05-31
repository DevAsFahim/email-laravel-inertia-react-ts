import { FormEvent, FormEventHandler, useCallback, useMemo, useState } from 'react';
import { BlockManager, BasicType, AdvancedType, JsonToMjml, IBlockData } from 'easy-email-core';
import { BlockAvatarWrapper, EmailEditor, EmailEditorProvider, IEmailTemplate } from 'easy-email-editor';
import { ExtensionProps, StandardLayout } from 'easy-email-extensions';
import { useWindowSize } from 'react-use';
import NProgress from 'nprogress'
import { PageProps } from '@/types';
import mjml from 'mjml-browser';
import './EmailTemplate.css'

import { BlockAttributeConfigurationManager, BlockMarketManager, BlockMaskWrapper } from 'easy-email-extensions';
import { CustomBlocksType } from './components/CustomBlocks/constants';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';


// theme, If you need to change the theme, you can make a duplicate in https://arco.design/themes/design/1799/setting/base/Color
import '@arco-themes/react-easy-email-theme/css/arco.css';
import { Router } from 'ziggy-js';
import { router } from '@inertiajs/react';

const managerCustom = BlockMarketManager.addCategories([
  {
    title: 'Custom',
    name: 'custom',
    blocks: [
      {
        type: BasicType.TEXT,
        title: 'Text',
        description: 'This block allows you to display text in your email.',
        component: () => {
          return (
            <BlockMaskWrapper
              type={BasicType.TEXT}
              payload={{
                attributes: {
                  'font-size': '20px',
                  align: 'center',
                  padding: '0px 0px 0px 0px',
                  color: '#4A90E2',
                  background: '#FF0000',
                },
                data: {
                  value: {
                    content: '20px',
                  },
                },
              }}
            >
              <div style={{ fontSize: 20, width: '100%', paddingLeft: 20 }}>20px</div>
            </BlockMaskWrapper>
          );
        },
      },
    ],
  },
]);

const categories: ExtensionProps['categories'] = [
  {
    label: 'Content',
    active: true,
    blocks: [
      {
        type: AdvancedType.TEXT,
        payload: { attributes: { padding: '0px 0px 0px 0px', color: '#ff0000' } },
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
  {
    label: 'Custom',
    active: true,
    displayType: 'custom',
    blocks: [
      <BlockAvatarWrapper type={CustomBlocksType.PRODUCT_RECOMMENDATION}>
        <div
          style={{
            position: 'relative',
            border: '1px solid #ccc',
            marginBottom: 20,
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <img
            src={
              'http://res.cloudinary.com/dwkp0e1yo/image/upload/v1665841389/ctbjtig27parugrztdhk.png'
            }
            style={{
              maxWidth: '100%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
            }}
          />
        </div>
      </BlockAvatarWrapper>,
    ],
  },
];

const handleTest = () => {
  alert('kire beda')
}
BlockAttributeConfigurationManager.add({
  [AdvancedType.TEXT]: () => <div onClick={handleTest}>will be overwrite `color`</div>,
});

// const initialValues = {
//   subject: 'Welcome to Easy-email',
//   subTitle: 'Nice to meet you!',
//   content: BlockManager.getBlockByType(BasicType.PAGE)!.create({}),
// };

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

const saveTemplate = (values: any) => {
  NProgress.start()
  const jsonData = {
    name: 'Fahim',
    source_code: JSON.stringify(values)
  }
  
  router.post(route('data-add'), jsonData);
  NProgress.start()
  alert('data added successfully')

};

export default function EmailTemplate({ template }: PageProps<{ template: Object }>) {
  
  // console.log(JSON.parse(template.source_code).content)
  const templateContent = JSON.parse(template.source_code).content

  const [templateData, setTemplateData] = useState<IEmailTemplate['content']>(templateContent);
  
  const { width } = useWindowSize();

  const smallScene = width < 2000;

  const initialValues: IEmailTemplate | null = useMemo(() => {
    return {
      subject: 'Welcome to Besnik Email Template',
      subTitle: 'Nice to meet you!',
      content: templateData
    };
  }, [templateData]);

  function onUploadImage () {

  }

  return (
    <>
      <EmailEditorProvider
        data={initialValues}
        height={'calc(100vh - 72px)'}
        autoComplete
        dashed={false}
        interactiveStyle={{
          hoverColor: '#78A349',
          selectedColor: 'red',
        }}
      >
        {({ values }, { submit }) => {
          return (
            <>

              <header className='m-5'>
                <button onClick={() => onExportHtml(values)} className='bg-blue-600 px-7 py-3 rounded-md text-white'>Copy HTML</button>
                <button  onClick={() => saveTemplate(values)} className='bg-green-500 px-7 py-3 ml-3 rounded-md text-white'>Save</button>
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

