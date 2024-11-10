import {SettingsForm} from '../_components/settings-form';

const SettingsPage = async () => {
    return (
        <section className="w-full">
            <div className="flex flex-col items-center justify-center">
                <SettingsForm/>
            </div>
        </section>
    );
};

export default SettingsPage;
