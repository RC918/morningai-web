import { AppConfig } from '@/utils/AppConfig';

export const Logo = (props: {
  isTextHidden?: boolean;
}) => (
  <div className="flex items-center text-xl font-semibold">
    <svg
      className="mr-2 size-8 stroke-current stroke-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6" />
      <path d="M21 12h-6m-6 0H3" />
      <path d="M18.364 5.636L15.536 8.464m-7.072 0L5.636 5.636" />
      <path d="M18.364 18.364L15.536 15.536m-7.072 0L5.636 18.364" />
    </svg>
    {!props.isTextHidden && AppConfig.name}
  </div>
);
