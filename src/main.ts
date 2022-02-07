import { App, Modal, Plugin, PluginSettingTab } from 'obsidian';

interface TemplateMigrationSettings {
	
}

const DEFAULT_SETTINGS: TemplateMigrationSettings = {
	
}

export default class TemplateMigrationPlugin extends Plugin {
	settings: TemplateMigrationSettings;

	async onload() {
		await this.loadSettings();

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'run-template-migration',
			name: 'Run template migration',
			callback: () => {
				new TemplateMigrationModal(this.app).open();
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new TemplateMigrationSettingsTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class TemplateMigrationModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class TemplateMigrationSettingsTab extends PluginSettingTab {
	plugin: TemplateMigrationPlugin;

	constructor(app: App, plugin: TemplateMigrationPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings Template Migration'});
	}
}