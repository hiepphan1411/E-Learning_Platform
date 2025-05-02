import { useState } from "react";
import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";
import ToggleSwitchCustom from "./ToggleSwitchCustom";

export default function Security() {
    const [twoFactor, setTwoFactor] = useState(false);
	return (
		<SettingSection icon={Lock} title={"Cài đặt bảo mật"}>
			<ToggleSwitchCustom
				label={"Xác thực Two-Factor"}
				isOn={twoFactor}
				onToggle={() => setTwoFactor(!twoFactor)}
			/>
			<div className='mt-4'>
				<button
					className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded 
        transition duration-200
        '
				>
					Thay đổi mật khẩu
				</button>
			</div>
		</SettingSection>
	);
}