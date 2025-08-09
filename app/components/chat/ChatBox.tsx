import React from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { classNames } from '~/utils/classNames';
import { PROVIDER_LIST } from '~/utils/constants';
import { ModelSelector } from '~/components/chat/ModelSelector';
import { APIKeyManager } from './APIKeyManager';
import { LOCAL_PROVIDERS } from '~/lib/stores/settings';
import FilePreview from './FilePreview';
import { ScreenshotStateManager } from './ScreenshotStateManager';
import { SendButton } from './SendButton.client';
import { IconButton } from '~/components/ui/IconButton';
import { toast } from 'react-toastify';
import { SpeechRecognitionButton } from '~/components/chat/SpeechRecognition';
import { SupabaseConnection } from './SupabaseConnection';
import { ExpoQrModal } from '~/components/workbench/ExpoQrModal';
import styles from './BaseChat.module.scss';
import type { ProviderInfo } from '~/types/model';
import { ColorSchemeDialog } from '~/components/ui/ColorSchemeDialog';
import type { DesignScheme } from '~/types/design-scheme';
import type { ElementInfo } from '~/components/workbench/Inspector';
import { McpTools } from './MCPTools';

interface ChatBoxProps {
  isModelSettingsCollapsed: boolean;
  setIsModelSettingsCollapsed: (collapsed: boolean) => void;
  provider: any;
  providerList: any[];
  modelList: any[];
  apiKeys: Record<string, string>;
  isModelLoading: string | undefined;
  onApiKeysChange: (providerName: string, apiKey: string) => void;
  uploadedFiles: File[];
  imageDataList: string[];
  textareaRef: React.RefObject<HTMLTextAreaElement> | undefined;
  input: string;
  handlePaste: (e: React.ClipboardEvent) => void;
  TEXTAREA_MIN_HEIGHT: number;
  TEXTAREA_MAX_HEIGHT: number;
  isStreaming: boolean;
  handleSendMessage: (event: React.UIEvent, messageInput?: string) => void;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  chatStarted: boolean;
  exportChat?: () => void;
  qrModalOpen: boolean;
  setQrModalOpen: (open: boolean) => void;
  handleFileUpload: () => void;
  setProvider?: ((provider: ProviderInfo) => void) | undefined;
  model?: string | undefined;
  setModel?: ((model: string) => void) | undefined;
  setUploadedFiles?: ((files: File[]) => void) | undefined;
  setImageDataList?: ((dataList: string[]) => void) | undefined;
  handleInputChange?: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined;
  handleStop?: (() => void) | undefined;
  enhancingPrompt?: boolean | undefined;
  enhancePrompt?: (() => void) | undefined;
  chatMode?: 'discuss' | 'build';
  setChatMode?: (mode: 'discuss' | 'build') => void;
  designScheme?: DesignScheme;
  setDesignScheme?: (scheme: DesignScheme) => void;
  selectedElement?: ElementInfo | null;
  setSelectedElement?: ((element: ElementInfo | null) => void) | undefined;
}

export const ChatBox: React.FC<ChatBoxProps> = (props) => {
  return (
    <div
      className={classNames(
        'relative backdrop-blur-3xl p-2 rounded-xl border shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-full max-w-[95vw] mx-auto z-prompt transition-all duration-700 hover:shadow-[0_16px_64px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_16px_64px_rgba(0,0,0,0.4)] hover:scale-[1.01] group relative overflow-hidden',

        // Light theme styling
        'bg-gradient-to-br from-white/80 via-gray-50/90 to-white/80 border-gray-200/60 hover:border-gray-300/80',

        // Dark theme styling
        'dark:bg-gradient-to-br dark:from-slate-900/80 dark:via-slate-800/90 dark:to-slate-900/80 dark:border-slate-700/60 dark:hover:border-slate-600/80',
      )}
    >
      {/* Theme-adaptive floating effects */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/5 to-purple-400/5 dark:from-purple-400/10 dark:to-blue-400/10 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400/5 to-cyan-400/5 dark:from-cyan-400/10 dark:to-blue-400/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-blue-400/3 to-purple-400/3 dark:from-purple-400/5 dark:to-cyan-400/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Enhanced SVG Effects */}
      <svg className={classNames(styles.PromptEffectContainer, 'opacity-90')}>
        <defs>
          <linearGradient
            id="line-gradient"
            x1="20%"
            y1="0%"
            x2="-14%"
            y2="10%"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(-45)"
          >
            <stop
              offset="0%"
              stopColor="currentColor"
              stopOpacity="0%"
              className="text-blue-500 dark:text-purple-400"
            ></stop>
            <stop
              offset="35%"
              stopColor="currentColor"
              stopOpacity="60%"
              className="text-blue-600 dark:text-purple-500"
            ></stop>
            <stop
              offset="65%"
              stopColor="currentColor"
              stopOpacity="60%"
              className="text-purple-600 dark:text-blue-400"
            ></stop>
            <stop
              offset="100%"
              stopColor="currentColor"
              stopOpacity="0%"
              className="text-purple-500 dark:text-cyan-400"
            ></stop>
          </linearGradient>
          <linearGradient id="shine-gradient">
            <stop offset="0%" stopColor="white" stopOpacity="0%"></stop>
            <stop
              offset="40%"
              stopColor="currentColor"
              stopOpacity="40%"
              className="text-gray-400 dark:text-white"
            ></stop>
            <stop
              offset="60%"
              stopColor="currentColor"
              stopOpacity="40%"
              className="text-gray-400 dark:text-white"
            ></stop>
            <stop offset="100%" stopColor="white" stopOpacity="0%"></stop>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect
          className={classNames(styles.PromptEffectLine, 'stroke-2 stroke-blue-500 dark:stroke-purple-400')}
          pathLength="100"
          strokeLinecap="round"
          filter="url(#glow)"
        ></rect>
        <rect className={classNames(styles.PromptShine)} x="48" y="24" width="80" height="2"></rect>
      </svg>

      {/* Model Settings Panel - Moved to Top with High Z-Index */}
      <div className="mb-3 relative z-[100]">
        <ClientOnly>
          {() => (
            <div
              className={classNames(
                'transition-all duration-500 ease-out relative z-[100]',
                props.isModelSettingsCollapsed
                  ? 'opacity-0 max-h-0 overflow-hidden'
                  : 'opacity-100 max-h-96 border rounded-xl p-4 backdrop-blur-sm shadow-lg bg-white/80 dark:bg-slate-800/80 border-gray-200/60 dark:border-slate-600/60',
              )}
            >
              <div className="relative z-[100]">
                <ModelSelector
                  key={props.provider?.name + ':' + props.modelList.length}
                  model={props.model}
                  setModel={props.setModel}
                  modelList={props.modelList}
                  provider={props.provider}
                  setProvider={props.setProvider}
                  providerList={props.providerList || (PROVIDER_LIST() as ProviderInfo[])}
                  apiKeys={props.apiKeys}
                  modelLoading={props.isModelLoading}
                />
                {(props.providerList || []).length > 0 &&
                  props.provider &&
                  (!LOCAL_PROVIDERS.includes(props.provider.name) || 'OpenAILike') && (
                    <APIKeyManager
                      provider={props.provider}
                      apiKey={props.apiKeys[props.provider.name] || ''}
                      setApiKey={(key) => {
                        props.onApiKeysChange(props.provider.name, key);
                      }}
                    />
                  )}
              </div>
            </div>
          )}
        </ClientOnly>
      </div>

      <FilePreview
        files={props.uploadedFiles}
        imageDataList={props.imageDataList}
        onRemove={(index) => {
          props.setUploadedFiles?.(props.uploadedFiles.filter((_, i) => i !== index));
          props.setImageDataList?.(props.imageDataList.filter((_, i) => i !== index));
        }}
      />

      <ClientOnly>
        {() => (
          <ScreenshotStateManager
            setUploadedFiles={props.setUploadedFiles}
            setImageDataList={props.setImageDataList}
            uploadedFiles={props.uploadedFiles}
            imageDataList={props.imageDataList}
          />
        )}
      </ClientOnly>

      {/* Enhanced Selected Element Display */}
      {props.selectedElement && (
        <div className="flex mx-1 gap-3 items-center justify-between rounded-lg rounded-b-none border border-b-none text-bolt-elements-textPrimary py-2.5 px-3 font-medium text-sm bg-white/60 dark:bg-slate-800/60 border-gray-200/60 dark:border-slate-600/60 backdrop-blur-sm">
          <div className="flex gap-3 items-center lowercase">
            <code className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-purple-500 dark:to-blue-600 rounded-lg px-3 py-1.5 mr-1 text-white font-mono text-sm shadow-lg">
              {props?.selectedElement?.tagName}
            </code>
            <span className="text-bolt-elements-textSecondary">selected for inspection</span>
          </div>
          <button
            className="bg-transparent text-blue-600 dark:text-purple-400 hover:text-blue-700 dark:hover:text-purple-300 hover:bg-blue-50 dark:hover:bg-purple-900/20 px-3 py-1.5 rounded-lg transition-all duration-200 font-medium text-sm"
            onClick={() => props.setSelectedElement?.(null)}
          >
            Clear
          </button>
        </div>
      )}

      {/* Main Input Container - Enhanced Size */}
      <div
        className={classNames(
          'relative shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] border backdrop-blur-2xl rounded-xl transition-all duration-500 group-hover:scale-[1.002] z-10',

          // Light theme
          'bg-white/70 border-gray-200/60 hover:border-gray-300/80 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]',

          // Dark theme
          'dark:bg-slate-800/70 dark:border-slate-600/60 dark:hover:border-slate-500/80 dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]',
        )}
      >
        <textarea
          ref={props.textareaRef}
          className={classNames(
            'w-full pl-4 pt-4 pr-16 pb-2 outline-none resize-none text-bolt-elements-textPrimary placeholder-bolt-elements-textTertiary bg-transparent text-base font-medium leading-relaxed',
            'transition-all duration-300 ease-out',
            'hover:placeholder-bolt-elements-textSecondary focus:placeholder-bolt-elements-textSecondary',
            'focus:ring-2 focus:ring-bolt-elements-focus/30 focus:border-bolt-elements-focus/60',
          )}
          onDragEnter={(e) => {
            e.preventDefault();
            e.currentTarget.style.border = '2px solid #3b82f6';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.border = '2px solid #3b82f6';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.currentTarget.style.border = '1px solid var(--bolt-elements-borderColor)';
            e.currentTarget.style.boxShadow = '';
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.style.border = '1px solid var(--bolt-elements-borderColor)';
            e.currentTarget.style.boxShadow = '';

            const files = Array.from(e.dataTransfer.files);

            files.forEach((file) => {
              if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = (e) => {
                  const base64Image = e.target?.result as string;

                  props.setUploadedFiles?.([...props.uploadedFiles, file]);
                  props.setImageDataList?.([...props.imageDataList, base64Image]);
                };

                reader.readAsDataURL(file);
              }
            });
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              if (event.shiftKey) {
                return;
              }

              event.preventDefault();

              if (props.isStreaming) {
                props.handleStop?.();
                return;
              }

              if (event.nativeEvent.isComposing) {
                return;
              }

              props.handleSendMessage?.(event);
            }
          }}
          value={props.input}
          onChange={(event) => {
            props.handleInputChange?.(event);
          }}
          onPaste={props.handlePaste}
          style={{
            minHeight: props.TEXTAREA_MIN_HEIGHT,
            maxHeight: props.TEXTAREA_MAX_HEIGHT,
          }}
          placeholder={
            props.chatMode === 'build'
              ? 'What are we creating together today?'
              : "Got something on your mind? Let's build around it."
          }
          translate="no"
        />

        <ClientOnly>
          {() => (
            <SendButton
              show={props.input.length > 0 || props.isStreaming || props.uploadedFiles.length > 0}
              isStreaming={props.isStreaming}
              disabled={!props.providerList || props.providerList.length === 0}
              onClick={(event) => {
                if (props.isStreaming) {
                  props.handleStop?.();
                  return;
                }

                if (props.input.length > 0 || props.uploadedFiles.length > 0) {
                  props.handleSendMessage?.(event);
                }
              }}
            />
          )}
        </ClientOnly>

        {/* Theme-adaptive Bottom Control Bar - Enhanced Spacing */}
        <div className="flex justify-between items-center text-sm p-4 pt-3 border-t backdrop-blur-sm rounded-b-xl bg-gray-50/50 dark:bg-slate-900/50 border-gray-200/30 dark:border-slate-600/30">
          <div className="flex gap-2 items-center">
            <ColorSchemeDialog designScheme={props.designScheme} setDesignScheme={props.setDesignScheme} />
            <McpTools />

            <IconButton
              title="Upload file"
              className="transition-all duration-300 hover:scale-110 rounded-xl p-3 hover:shadow-lg group/btn backdrop-blur-sm border hover:bg-gray-100 dark:hover:bg-slate-700 border-gray-200/50 dark:border-slate-600/50 hover:border-gray-300 dark:hover:border-slate-500"
              onClick={() => props.handleFileUpload()}
            >
              <div className="i-ph:paperclip text-xl group-hover/btn:text-blue-600 dark:group-hover/btn:text-cyan-400 transition-colors duration-300"></div>
            </IconButton>

            <IconButton
              title="Enhance prompt"
              disabled={props.input.length === 0 || props.enhancingPrompt}
              className={classNames(
                'transition-all duration-300 hover:scale-110 rounded-xl p-3 hover:shadow-lg group/btn backdrop-blur-sm border hover:bg-gray-100 dark:hover:bg-slate-700 border-gray-200/50 dark:border-slate-600/50 hover:border-gray-300 dark:hover:border-slate-500',
                props.enhancingPrompt
                  ? 'opacity-100 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-500/30'
                  : '',
              )}
              onClick={() => {
                props.enhancePrompt?.();
                toast.success('Prompt enhanced! ✨');
              }}
            >
              {props.enhancingPrompt ? (
                <div className="i-svg-spinners:90-ring-with-bg text-purple-600 dark:text-purple-400 text-xl animate-spin"></div>
              ) : (
                <div className="i-bolt:stars text-xl group-hover/btn:text-yellow-600 dark:group-hover/btn:text-yellow-400 transition-colors duration-300"></div>
              )}
            </IconButton>

            <SpeechRecognitionButton
              isListening={props.isListening}
              onStart={props.startListening}
              onStop={props.stopListening}
              disabled={props.isStreaming}
            />

            {props.chatStarted && (
              <IconButton
                title="Discussion Mode"
                className={classNames(
                  'transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm hover:scale-105 hover:shadow-lg',
                  props.chatMode === 'discuss'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 dark:from-purple-500 dark:to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100/80 dark:bg-slate-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 backdrop-blur-sm border border-gray-200/50 dark:border-slate-600/50',
                )}
                onClick={() => {
                  props.setChatMode?.(props.chatMode === 'discuss' ? 'build' : 'discuss');
                }}
              >
                <div className={`i-ph:chats text-lg`} />
                {props.chatMode === 'discuss' ? <span>Discuss</span> : <></>}
              </IconButton>
            )}

            <IconButton
              title="Model Settings"
              className={classNames(
                'transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm hover:scale-105 hover:shadow-lg relative z-[99]',
                {
                  'bg-gradient-to-r from-blue-500 to-purple-600 dark:from-purple-500 dark:to-blue-600 text-white shadow-lg':
                    props.isModelSettingsCollapsed,
                  'bg-gray-100/80 dark:bg-slate-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 backdrop-blur-sm border border-gray-200/50 dark:border-slate-600/50':
                    !props.isModelSettingsCollapsed,
                },
              )}
              onClick={() => props.setIsModelSettingsCollapsed(!props.isModelSettingsCollapsed)}
              disabled={!props.providerList || props.providerList.length === 0}
            >
              <div
                className={`i-ph:caret-${props.isModelSettingsCollapsed ? 'right' : 'down'} text-lg transition-transform duration-200`}
              />
              {props.isModelSettingsCollapsed ? <span className="max-w-24 truncate">{props.model}</span> : <></>}
            </IconButton>
          </div>

          {/* Enhanced Keyboard Shortcut Hint */}
          {props.input.length > 3 ? (
            <div className="text-xs text-bolt-elements-textTertiary flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm bg-gray-100/60 dark:bg-slate-800/60 border border-gray-200/40 dark:border-slate-600/40">
              <span>Press</span>
              <kbd className="kbd px-2 py-1 rounded-md bg-bolt-elements-background-depth-2/80 text-xs font-mono shadow-sm border border-bolt-elements-borderColor/40">
                Shift
              </kbd>
              <span>+</span>
              <kbd className="kbd px-2 py-1 rounded-md bg-bolt-elements-background-depth-2/80 text-xs font-mono shadow-sm border border-bolt-elements-borderColor/40">
                Enter
              </kbd>
              <span>for new line</span>
            </div>
          ) : null}

          <div className="flex items-center gap-2">
            <SupabaseConnection />
            <ExpoQrModal open={props.qrModalOpen} onClose={() => props.setQrModalOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};
