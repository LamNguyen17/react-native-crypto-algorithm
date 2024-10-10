extension String {
    func toUInt8Array() -> [UInt8] {
        return Array(self.utf8)
    }
}
